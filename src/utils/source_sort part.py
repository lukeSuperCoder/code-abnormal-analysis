###0.将代码分为good和bad片段，两部分分开执行，都去w32文件，以及只包含good或bad的文件
# bad：除含good的函数，还记录fix所在行
#good：除含bas的函数

'''
###1.处理c文件,错误片段分开
import re
import os,csv
# 原始文件夹路径
source_folder = '/home/ahhha/code/testcases'
# 新建文件夹路径
good_folder = '/home/ahhha/code/mycode/sard/good'
bad_folder = '/home/ahhha/code/mycode/sard/bad'
#bad_line_csv = '/home/ahhha/code/mycode/sard/sard_bad_line.csv'

# 匹配 "类型 函数名(参数) { 函数体 }" 的模式
# 正则表达式中的 ?s 使 . 匹配包括换行在内的所有字符
# 正则表达式中的 .* 是贪婪匹配，会尽可能匹配更多的字符
# 因此，我们使用 .*? 来进行非贪婪匹配，使每个匹配尽可能短
#patterngood = r'(?s)(\w+\s+\w*good\w*\(.*?\)\s*\{.*?\})'
#pattern_good = r'(?s)((?:static\s+)?\w+\s+\w*good\w*\s*\(.*?\)\s*\{[^{}]*((?:\{[^{}]*\}[^{}]*)*)\})'
#pattern_bad = r'(?s)(\w+\s+\w*bad\w*\(.*?\)\s*\{.*?\})'
#如果想用代码直接训练DDM，这里可以添加一个返回除了指定语句外的代码的功能

#1.提取good函数
def remove_comments_and_empty_lines(code):
    new_code = []
    statement_line = None
    in_comment_block = False

    for line in code:
        # 删除行内的注释
        line = line.split('//')[0]
        
        # 处理多行注释块
        if in_comment_block:
            if '*/' in line:
                line = line.split('*/')[1]
                in_comment_block = False
            else:
                continue
        elif '/*' in line:
            if '*/' in line:
                line = line.split('/*')[0] + line.split('*/')[1]
            else:
                line = line.split('/*')[0]
                in_comment_block = True
        
        # 删除空行
        line = line.strip()
        if line:
            new_code.append(line)
    
    return '\n'.join(new_code)


def source_sort(source_dir,target_dir):
    bad_line_csv = '/home/ahhha/code/mycode/sard/sard_good_line.csv'
    with open(bad_line_csv,'w',newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['filename','flaw_line']) 

        for root, dirs, files in os.walk(source_dir):
            #print(root)
            for file in files:
                flaw_line_numbers = 0
                if file.endswith(".c") and "w32" not in file and"bad" not in file and "good" not in file:
                    # 构造目标文件夹路径
                    relative_path = os.path.relpath(root, source_dir)
                    target_subdir = os.path.join(target_dir, relative_path)
                    os.makedirs(target_subdir, exist_ok=True)
                    
                    # 读取源文件内容
                    source_file = os.path.join(root, file)
                    with open(source_file, 'r') as f:
                        lines = f.readlines()

                    in_good_function = False
                    found_good_function = False
                    bracket_stack = []
                    new_lines = []
                 
                    #***********因为bad没有分之前都在源文件前面，所以记录的缺陷行其实也是在源文件的缺陷行***********"
                    for i, line in enumerate(lines):
                        #print("line",line)
                        #print("bracket_stack",bracket_stack,len(bracket_stack))
                        #print("in_bad_function",in_bad_function
                        #print("***********good - bad***********")
                        if ('good' in line or ('Good' in line))and '(' in line and 'void' in line and not in_good_function and not found_good_function:  # 开始一个good函数
                            in_good_function = True
                            found_good_function = True
                        if '{' in line and in_good_function:
                            bracket_stack.append('{')
                        if '}' in line and in_good_function:
                            bracket_stack.pop()
                            if len(bracket_stack)  == 0:  # good函数结束
                                new_lines.append(line) 
                                in_good_function = False      
                        if in_good_function:
                            new_lines.append(line) 
                                              
                    if found_good_function:
                        new_lines=remove_comments_and_empty_lines(new_lines)
                        target_file = os.path.join(target_subdir, file)
                        with open(target_file, 'w') as f:
                            f.writelines(new_lines)
                    #print(a)
                        writer.writerow([file])  # 将修改行数和文件名保存到 CSV 文件中
                    #print(flaw_line_numbers)
                    
                
                                
                
source_sort(source_folder,good_folder)

'''
###2.处理c文件,提取错误片段和错误行
import re,csv
import os
# 原始文件夹路径
source_folder = '/home/ahhha/code/testcases'

# 新建文件夹路径
good_folder = '/home/ahhha/code/mycode/sard/good'
bad_folder = '/home/ahhha/code/mycode/sard/bad'
# 匹配 "类型 函数名(参数) { 函数体 }" 的模式
# 正则表达式中的 ?s 使 . 匹配包括换行在内的所有字符
# 正则表达式中的 .* 是贪婪匹配，会尽可能匹配更多的字符
# 因此，我们使用 .*? 来进行非贪婪匹配，使每个匹配尽可能短
#patterngood = r'(?s)(\w+\s+\w*good\w*\(.*?\)\s*\{.*?\})'
#pattern_good = r'(?s)((?:static\s+)?\w+\s+\w*good\w*\s*\(.*?\)\s*\{[^{}]*((?:\{[^{}]*\}[^{}]*)*)\})'
#pattern_bad = r'(?s)(\w+\s+\w*bad\w*\(.*?\)\s*\{.*?\})'
def remove_comments_and_empty_lines(code):
    new_code = []
    statement = None
    in_comment_block = False
    flaw_line_number = None
    #print(code)
    for line in code:
        # 删除行内的注释
        line = line.split('//')[0]
        
        # 处理多行注释块
        if in_comment_block:
            if '*/' in line:
                line = line.split('*/')[1]
                in_comment_block = False
            else:
                continue
        elif '/*' in line:
            if "FLAW" in line:
                flaw_line_number = len(new_code)+1
            if '*/' in line:
                line = line.split('/*')[0] + line.split('*/')[1]
            else:
                line = line.split('/*')[0]
                in_comment_block = True
        
        # 删除空行
        line = line.strip()
        if line:
            new_code.append(line)
    
    return '\n'.join(new_code),flaw_line_number
def source_sort(source_dir,target_dir):
    bad_line_csv = '/home/ahhha/code/mycode/sard/sard_bad_line.csv'
    with open(bad_line_csv,'w',newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['filename','flaw_line']) 

        for root, dirs, files in os.walk(source_dir):
            #print(root)
            for file in files:
    
                if file.endswith(".c") and "w32" not in file and"bad" not in file and "good" not in file:
                    # 构造目标文件夹路径
                    relative_path = os.path.relpath(root, source_dir)
                    target_subdir = os.path.join(target_dir, relative_path)
                    os.makedirs(target_subdir, exist_ok=True)
                    
                    # 读取源文件内容
                    source_file = os.path.join(root, file)
                    with open(source_file, 'r') as f:
                        lines = f.readlines()

                    in_bad_function = False
                    bracket_stack = []
                    new_lines = []

                    for i,line in enumerate(lines):
                        #print("line",line)
                        #print("bracket_stack",bracket_stack,len(bracket_stack))
                        #print("in_bad_function",in_bad_function)
                        #print("***********")
                        if ('bad' in line or ('Bad' in line))and '(' in line and 'void' in line and not in_bad_function:  # 开始一个bad函数
            
                            in_bad_function = True
                        if '{' in line and in_bad_function:
                            bracket_stack.append('{')
                        if '}' in line and in_bad_function:
                            bracket_stack.pop()
                            if not bracket_stack:  # bad函数结束
                                new_lines.append(line)
                                in_bad_function = False
                        if  in_bad_function:
                            new_lines.append(line)
                    new_lines,flaw_line_numbers = remove_comments_and_empty_lines(new_lines)  
                    target_file = os.path.join(target_subdir, file)
                    with open(target_file, 'w') as f:
                        f.writelines(new_lines)
                    a = flaw_line_numbers
                    writer.writerow([file,a])  # 将修改行数和文件名保存到 CSV 文件中
                          
source_sort(source_folder,bad_folder)