##在这之前确保代码已经分好组，可使用source_sort.py对代码分组
##2.将源代码和修改后c语言代码转化为ast,保存到csv文件中
import time, numpy as np
import os, sys
import csv
sys.path.append('../ncuthomework/')
from pycparser import parse_file
from pycparser.plyparser import ParseError
from pycparser.c_ast import *

def get_ast(source, pid=''):
    name1 = int(time.time() * 10**6)
    name2 = np.random.randint(0, 1000+1)
    filename = '/tmp/%s_%d_%d.c' % (pid, name1, name2)
    with open(filename, 'w') as f:
        f.write(source)
    
    ast = parse_file(filename=filename, use_cpp=True,
                    cpp_path='gcc',
                    cpp_args=['-E', r'-I/home/ahhha/download/utils/fake_libc_include', r'-I/home/ahhha/code/testcasesupport'])
                    #cpp_args=['-E', r'-I/home/ahhha/code/testcasesupport'])
    return ast
def show(_ast, pad=''):
    #print("_ast.coord")
    c = _ast.__class__.__name__
    attributes = []
    if _ast.attr_names:
        for attr_name in _ast.attr_names:
            if attr_name in ['name', 'op', 'declname', 'type', 'value']:
                attributes.append(getattr(_ast, attr_name))
            elif attr_name == 'names':
                names = getattr(_ast, attr_name)
                if type(names) == list:
                    names = '<%s>' % ','.join(names)
                    names = ','.join(names)
                attributes.append(names)
    if attributes:
        c = '[%s:%s]' % (c, ','.join(attributes))
    else:
        c = '[%s]' % c
        
    if 'Constant:string' in c:
        c = c.replace(' ', '--SL-space--')
                
    print (pad + c)

    for name, child in _ast.children():
        print(str(_ast.coord).split('.c:')[-1] if _ast.coord is not None else '0:0')
        print(str(child.coord).split('.c:')[-1] if child.coord is not None else '0:0')
        show(child, pad+'  ')
    
    return

# def linearize_ast(_ast):
#     linearized_ast = ''
#     c = _ast.__class__.__name__

#     attributes = []
#     if _ast.attr_names:
#         for attr_name in _ast.attr_names:
#             if attr_name in ['name', 'declname', 'op', 'type', 'value']:
#                 attributes.append(getattr(_ast, attr_name))
#             elif attr_name == 'names':
#                 names = getattr(_ast, attr_name)
#                 if type(names) == list:
#                     names = ','.join(names)
#                 attributes.append(names)
#     if attributes:
#         c = '[%s:%s]' % (c, ','.join(attributes))
#     else:
#         c = '[%s]' % c

#     if 'Constant:string' in c:
#         c = c.replace(' ', '--SL-space--')

#     linearized_ast += c + ' ( '

#     for name, child in _ast.children():
#         linearized_ast += linearize_ast(child) + ' '

#     linearized_ast += ')'

#     return linearized_ast

#对给定的变量名 name 进行规范化处理，并返回规范化后的变量名
def get_normalized_name(name, name_dict, normalize_names):
    to_ignore = ['printf', 'scanf', 'gets', 'getchar', 'puts', 'putchar', \
                 'main', 'malloc', 'calloc', 'free', 'strlen', 'strcmp', 'strcat', \
                 'floor', 'round', 'ceil', 'log', 'pow', 'sqrt', 'sin', 'cos', 'tan', 'exp', 'abs', \
                 'fgets', 'fputs', 'freopen', 'fclose', 'fprintf', 'fscanf', 'fflush', 'fgetc', 'fputc', 'feof', 'fseek']
    
    if name in to_ignore:
        return name
    elif not normalize_names:
        return '_<id>_{}@'.format(name)
    elif name not in name_dict:
        name_dict[name] = '_<id>_%d@' % len(name_dict)
    return name_dict[name]

def linearize_ast(_ast, normalize_names, name_dict={}):
    linearized_ast = ''
    c = _ast.__class__.__name__
    
    attributes = []
    if _ast.attr_names:
        for attr_name in _ast.attr_names:
            if attr_name in ['name', 'declname']:
                attributes.append(get_normalized_name(getattr(_ast, attr_name), name_dict, normalize_names))
            if attr_name in ['op', 'type', 'value']:
                attributes.append(getattr(_ast, attr_name))
            elif attr_name == 'names':
                names = getattr(_ast, attr_name)
                if type(names) == list:
                    names = ','.join(names)
                #     names = ','.join([get_normalized_name(name, name_dict, normalize_names) for name in names])
                # else:
                #     names = get_normalized_name(names, name_dict, normalize_names)
                attributes.append(names)
    if attributes:
        c = '%s:%s' % (c, ','.join(attributes))
    else:
        c = '%s' % c

    if 'Constant:string' in c:
        c = c.replace(' ', '--SL-space--')

    linearized_ast += c + ' ( '
    flag_typedefs_not_over = True
    for name, child in _ast.children():
        if flag_typedefs_not_over:
            if 'Typedef' not in child.__class__.__name__:
                flag_typedefs_not_over = False
                linearized_ast += linearize_ast(child, normalize_names, name_dict) + ' '
        else:
            linearized_ast += linearize_ast(child, normalize_names, name_dict) + ' '

    linearized_ast += ')'

    return linearized_ast
        
def get_linearized_ast(ast=None, source=None, normalize_names=False):
    assert source is not None or ast is not None
    if ast is None:
        try:
            ast = get_ast(source)
        except ParseError:
            return None
    return linearize_ast(ast, normalize_names).replace('( )', '')

def tokenize_serialized_ast(serialized_ast):
    output = []
    for token in serialized_ast.split():
        token = token.strip()
        assert token == '(' or token == ')' or (token[0] == '[' and token[-1] == ']'), token
        output.append(token)
    return output

def get_root_class_name_with_attributes(_ast, name_dict, normalize_names):
    c = _ast.__class__.__name__
        
    attributes = []
    if _ast.attr_names:
        for attr_name in _ast.attr_names:
            if attr_name in ['name', 'declname']:
                #print("1")
                #print(attr_name)
                #print("\n")
                attributes.append(get_normalized_name(getattr(_ast, attr_name), name_dict, normalize_names))
            if attr_name in ['op', 'type', 'value']:
                #print(getattr(_ast, attr_name))
                #print(attr_name)
                #print("2")
                #print(attr_name)
                #print("\n")
                attributes.append(getattr(_ast, attr_name))
            elif attr_name == 'names':
                names = getattr(_ast, attr_name)
                #print(attr_name)
                #print(getattr(_ast, attr_name))'
                #print("3")
                #print(attr_name)
                #print("\n")
                if type(names) == list:
                    names = ','.join(names)
                #     names = ','.join([get_normalized_name(name, name_dict, normalize_names) for name in names])
                # else:
                #     names = get_normalized_name(names, name_dict, normalize_names)
                attributes.append(names)
    if attributes:
        c = '%s:%s' % (c, ','.join(attributes))
    else:
        c = '%s' % c

    if 'Constant:string' in c:
        c = c.replace(' ', '--SL-space--')
    #print(c)
    #print("\n")
    return c

def subtree_to_list(_ast, name_dict, normalize_names, is_root=False, return_coord=True):
    #print("type",type(_ast))
    subtree_list = [get_root_class_name_with_attributes(_ast, name_dict, normalize_names)]
    for name, child in _ast.children():
        if is_root:
            if 'Typedef' not in child.__class__.__name__:
                is_root = False
                subtree_list.append(get_root_class_name_with_attributes(child, name_dict, normalize_names))
               # print(subtree_list)
        else:
            #print(subtree_list)
            subtree_list.append(get_root_class_name_with_attributes(child, name_dict, normalize_names))
    
    if return_coord:
        return (subtree_list, str(_ast.coord).split('.c:')[-1] if _ast.coord is not None else '0:0')
    
    return subtree_list

def ast_to_subtree_lists(_ast, normalize_names, name_dict = {}):
    tree_list = [subtree_to_list(_ast, name_dict, normalize_names, is_root=True)]
    #print(tree_list)
    flag_typedefs_not_over = True
    for name, child in _ast.children():
        if flag_typedefs_not_over:
            if 'Typedef' not in child.__class__.__name__:
                flag_typedefs_not_over = False
                tree_list.extend(ast_to_subtree_lists(child, normalize_names, name_dict))
                #print(tree_list)
        else:
            tree_list.extend(ast_to_subtree_lists(child, normalize_names, name_dict))
            #print(tree_list)
    return tree_list
  # normalize_names=true对AST树中的节点名称进行标准化处理，remove_leaf_subtrees=True去除只有一个节点的树
def get_subtree_list(ast=None, source=None, normalize_names=False, remove_leaf_subtrees=True):
    assert source is not None or ast is not None
    if ast is None:
        try:
            ast = get_ast(source)
        except ParseError:
            return None

    if remove_leaf_subtrees:         
        #过滤掉叶子节点
        return [(tl,coord) for tl,coord in ast_to_subtree_lists(ast, normalize_names) if len(tl)>1]
    else:
        #不过滤叶子节点
        return ast_to_subtree_lists(ast, normalize_names)

def get_only_list(ast=None, source=None, normalize_names=False, remove_leaf_subtrees=False):
    assert source is not None or ast is not None
    if ast is None:
        try:
            ast = get_ast(source)
        except ParseError:
            return None

    if remove_leaf_subtrees:         
        #过滤掉叶子节点
        return [tl for tl,coord in ast_to_subtree_lists(ast, normalize_names) if len(tl)>1]
    else:
        #不过滤叶子节点
        return [tl for tl, coord in ast_to_subtree_lists(ast, normalize_names)]

#convert the c code in  to ast
def c_to_ast(input_folder_path,output_folder_cvs):
  
    for foldername in os.listdir(input_folder_path):
        folder_path = os.path.join(input_folder_path, foldername)
        if not os.path.isdir(folder_path):
           continue

        output_filepath= os.path.join(output_folder_cvs, foldername + '.csv')
        print("output_filepath",output_filepath)
        with open(output_filepath, 'w', newline='') as f_out:
            csv_writer = csv.writer(f_out)
            
            csv_writer.writerow(['filename', 'subtree_list','onlylist'])
            
            for filename in os.listdir(folder_path):
                if not filename.endswith('.c'):
                    continue
                    
                filepath = os.path.join(folder_path, filename)
                with open(filepath, 'r', errors='ignore') as ff:
                    print("filepath",filepath)
                    text = ff.read()
                    subtree_list=get_subtree_list(ast=None, source=text, normalize_names=True, remove_leaf_subtrees=False)
                    onlylist=get_only_list(ast=None, source=text, normalize_names=True, remove_leaf_subtrees=False)
                    #print("type",type(onlylist))
                    #print(len(onlylist))
                    
                    # Write the filename and subtree list to the csv file
                    csv_writer.writerow([filename,subtree_list,onlylist])
        f_out.close()

############################################
if __name__ == '__main__':
    '''
    input_folder_path = '/home/ahhha/code/mycode/ncuthomework'
    output_folder_cvs = '/home/ahhha/code/mycode/data/csv0'
    c_to_ast(input_folder_path,output_folder_cvs)
    
    modify_source_path = '/home/ahhha/code/mycode/modify'
    modify_source_csv = '/home/ahhha/code/mycode/data/csv1'
    ##将修改后的代码转换为ast
    
    c_to_ast(modify_source_path,modify_source_csv)
    '''
    
    #modify_source_path = '/home/ahhha/code/mycode/sard/bad'
    #modify_source_csv = '/home/ahhha/code/mycode/data/ast/sard_bad_ast_csv'
    #c_to_ast(modify_source_path,modify_source_csv)
    
    input_source_path = '/home/ahhha/code/mycode/sard/test'
    output_source_csv = '/home/ahhha/code/mycode/data/ast/test'
    c_to_ast(input_source_path,output_source_csv)
              
##################################################

'''

test_prog = ''' '''
int main(){
   int n,k,flag=0;
   char s[n],a,e,i,o,u;
   scanf("%d\\n",&n);
   for(k=0;k<n;i++)
   {
       scanf("%c",&s[k]);
   }
   if(flag==1)
       printf("Special");
   else
       printf("Normal");
   
    return 0;
}
'''


'''
if __name__ == '__main__':
    print("hsdhfh")
    
    ast = get_ast(test_prog)
    show(ast)
   
    #subtrees = source_to_subtree_lists(test_prog)

    #for subtree, coord in subtrees:
      #print (coord, subtree)
      '''
'''
#删除C代码全部注释
def del_comment_c(in_dir, in_fname):
    in_path = os.path.join(in_dir, in_fname)
    write_buf = []
    slash_flag = 0
    with open(in_path, "rb", encoding='UTF-8') as f:
        for line in f:
            line = line.rstrip()
            if line.find("//") >= 0:
                p = line.split("//")[0]
                if p != "" and (p.isspace() != True):
                    write_buf.append(p)
            elif line.find("/*") >= 0 and line.find("*/") >= 0: 
                p1 = line.split("/*")[0]
                p2 = line.split("*/")[-1]
                if p1 != "" and (p1.isspace() != True):
                    write_buf.append(p1)
                if p2 != "" and (p2.isspace() != True):
                    write_buf.append(p2)
            elif line.find("/*") >= 0:
                p = line.split("/*")[0]
                if p != "":
                    write_buf.append(p)
                slash_flag = 1
            elif line.find("*/") >= 0:
                p = line.split("*/")[-1]
                if p != "" and p != "\n":
                    write_buf.append(p)
                slash_flag = 0
            elif slash_flag == 1:
                continue
            else:
                write_buf.append(line)       

    with open(in_path, "w", encoding='UTF-8') as f:
        f.write('\n'.join(write_buf))
        f.close()
    return
'''
