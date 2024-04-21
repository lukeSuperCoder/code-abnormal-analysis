let codeData = [
    {
        fileName: '124',
        id: '124-1',
        ast: `[(['FileAST', 'FuncDef'], '0:0'), (['FuncDef', 'Decl:_<id>_12@', 'Compound'], '1:6'), (['Decl:_<id>_12@', 'FuncDecl'], '1:6'), (['FuncDecl', 'TypeDecl:_<id>_12@'], '1:6'), (['TypeDecl:_<id>_12@', 'IdentifierType:void'], '1:6'), (['IdentifierType:void'], '1:1'), (['Compound', 'Decl:_<id>_1@', 'Decl:_<id>_3@', 'FuncCall', 'Assignment:=', 'If', 'Compound'], '2:1'), (['Decl:_<id>_1@', 'PtrDecl'], '3:10'), (['PtrDecl', 'TypeDecl:_<id>_1@'], '3:10'), (['TypeDecl:_<id>_1@', 'IdentifierType:char'], '3:12'), (['IdentifierType:char'], '3:5'), (['Decl:_<id>_3@', 'PtrDecl', 'Cast'], '4:10'), (['PtrDecl', 'TypeDecl:_<id>_3@'], '4:10'), (['TypeDecl:_<id>_3@', 'IdentifierType:char'], '4:12'), (['IdentifierType:char'], '4:5'), (['Cast', 'Typename:_<id>_5@', 'FuncCall'], '4:25'), (['Typename:_<id>_5@', 'PtrDecl'], '0:1'), (['PtrDecl', 'TypeDecl:_<id>_5@'], '4:31'), (['TypeDecl:_<id>_5@', 'IdentifierType:char'], '0:0'), (['IdentifierType:char'], '4:26'), (['FuncCall', 'ID:_<id>_6@', 'ExprList'], '4:33'), (['ID:_<id>_6@'], '4:33'), (['ExprList', 'BinaryOp:*'], '4:40'), (['BinaryOp:*', 'Constant:int,100', 'UnaryOp:sizeof'], '4:40'), (['Constant:int,100'], '4:40'), (['UnaryOp:sizeof', 'Typename:_<id>_5@'], '4:44'), (['Typename:_<id>_5@', 'TypeDecl:_<id>_5@'], '0:1'), (['TypeDecl:_<id>_5@', 'IdentifierType:char'], '0:0'), (['IdentifierType:char'], '4:51'), (['FuncCall', 'ID:_<id>_7@', 'ExprList'], '5:5'), (['ID:_<id>_7@'], '5:5'), (['ExprList', 'ID:_<id>_3@', "Constant:char,'A'", 'BinaryOp:-'], '5:12'), (['ID:_<id>_3@'], '5:12'), (["Constant:char,'A'"], '5:24'), (['BinaryOp:-', 'Constant:int,100', 'Constant:int,1'], '5:29'), (['Constant:int,100'], '5:29'), (['Constant:int,1'], '5:33'), (['Assignment:=', 'ArrayRef', "Constant:char,'\\0'"], '6:5'), (['ArrayRef', 'ID:_<id>_3@', 'BinaryOp:-'], '6:5'), (['ID:_<id>_3@'], '6:5'), (['BinaryOp:-', 'Constant:int,100', 'Constant:int,1'], '6:16'), (['Constant:int,100'], '6:16'), (['Constant:int,1'], '6:20'), (["Constant:char,'\\0'"], '6:25'), (['If', 'Constant:int,1', 'Compound'], '7:5'), (['Constant:int,1'], '7:8'), (['Compound', 'Assignment:='], '8:1'), (['Assignment:=', 'ID:_<id>_1@', 'BinaryOp:-'], '9:9'), (['ID:_<id>_1@'], '9:9'), (['BinaryOp:-', 'ID:_<id>_3@', 'Constant:int,8'], '9:16'), (['ID:_<id>_3@'], '9:16'), (['Constant:int,8'], '9:29'), (['Compound', 'Decl:_<id>_13@', 'FuncCall', 'Assignment:=', 'FuncCall', 'FuncCall'], '11:1'), (['Decl:_<id>_13@', 'ArrayDecl'], '12:14'), (['ArrayDecl', 'TypeDecl:_<id>_13@', 'Constant:int,100'], '12:14'), (['TypeDecl:_<id>_13@', 'IdentifierType:char'], '12:14'), (['IdentifierType:char'], '12:9'), (['Constant:int,100'], '12:21'), (['FuncCall', 'ID:_<id>_7@', 'ExprList'], '13:9'), (['ID:_<id>_7@'], '13:9'), (['ExprList', 'ID:_<id>_13@', "Constant:char,'C'", 'BinaryOp:-'], '13:16'), (['ID:_<id>_13@'], '13:16'), (["Constant:char,'C'"], '13:24'), (['BinaryOp:-', 'Constant:int,100', 'Constant:int,1'], '13:29'), (['Constant:int,100'], '13:29'), (['Constant:int,1'], '13:33'), (['Assignment:=', 'ArrayRef', "Constant:char,'\\0'"], '14:9'), (['ArrayRef', 'ID:_<id>_13@', 'BinaryOp:-'], '14:9'), (['ID:_<id>_13@'], '14:9'), (['BinaryOp:-', 'Constant:int,100', 'Constant:int,1'], '14:16'), (['Constant:int,100'], '14:16'), (['Constant:int,1'], '14:20'), (["Constant:char,'\\0'"], '14:25'), (['FuncCall', 'ID:_<id>_14@', 'ExprList'], '15:9'), (['ID:_<id>_14@'], '15:9'), (['ExprList', 'ID:_<id>_1@', 'ID:_<id>_13@'], '15:16'), (['ID:_<id>_1@'], '15:16'), (['ID:_<id>_13@'], '15:22'), (['FuncCall', 'ID:_<id>_15@', 'ExprList'], '16:9'), (['ID:_<id>_15@'], '16:9'), (['ExprList', 'ID:_<id>_1@'], '16:19'), (['ID:_<id>_1@'], '16:19')]`,
        spmm: `[(['FileAST', 'FuncDef', 'FuncDef'], '0:0'), (['FuncDef', 'Decl:_<id>_0@', 'Compound'], '1:13'), (['Decl:_<id>_0@', 'FuncDecl'], '1:13'), (['FuncDecl', 'TypeDecl:_<id>_0@'], '1:13'), (['TypeDecl:_<id>_0@', 'IdentifierType:void'], '1:13'), (['IdentifierType:void'], '1:8'), (['Compound', 'Decl:_<id>_1@', 'Decl:_<id>_3@', 'FuncCall', 'Assignment:=', 'Assignment:=', 'Compound'], '2:1'), (['Decl:_<id>_1@', 'PtrDecl'], '3:10'), (['PtrDecl', 'TypeDecl:_<id>_1@'], '3:10'), (['TypeDecl:_<id>_1@', 'IdentifierType:char'], '3:12'), (['IdentifierType:char'], '3:5'), (['Decl:_<id>_3@', 'PtrDecl', 'Cast'], '4:10'), (['PtrDecl', 'TypeDecl:_<id>_3@'], '4:10'), (['TypeDecl:_<id>_3@', 'IdentifierType:char'], '4:12'), (['IdentifierType:char'], '4:5'), (['Cast', 'Typename:_<id>_5@', 'FuncCall'], '4:25'), (['Typename:_<id>_5@', 'PtrDecl'], '0:1'), (['PtrDecl', 'TypeDecl:_<id>_5@'], '4:31'), (['TypeDecl:_<id>_5@', 'IdentifierType:char'], '0:0'), (['IdentifierType:char'], '4:26'), (['FuncCall', 'ID:_<id>_6@', 'ExprList'], '4:33'), (['ID:_<id>_6@'], '4:33'), (['ExprList', 'BinaryOp:*'], '4:40'), (['BinaryOp:*', 'Constant:int,100', 'UnaryOp:sizeof'], '4:40'), (['Constant:int,100'], '4:40'), (['UnaryOp:sizeof', 'Typename:_<id>_5@'], '4:44'), (['Typename:_<id>_5@', 'TypeDecl:_<id>_5@'], '0:1'), (['TypeDecl:_<id>_5@', 'IdentifierType:char'], '0:0'), (['IdentifierType:char'], '4:51'), (['FuncCall', 'ID:_<id>_7@', 'ExprList'], '5:5'), (['ID:_<id>_7@'], '5:5'), (['ExprList', 'ID:_<id>_3@', "Constant:char,'A'", 'BinaryOp:-'], '5:12'), (['ID:_<id>_3@'], '5:12'), (["Constant:char,'A'"], '5:24'), (['BinaryOp:-', 'Constant:int,100', 'Constant:int,1'], '5:29'), (['Constant:int,100'], '5:29'), (['Constant:int,1'], '5:33'), (['Assignment:=', 'ArrayRef', "Constant:char,'\\0'"], '6:5'), (['ArrayRef', 'ID:_<id>_3@', 'BinaryOp:-'], '6:5'), (['ID:_<id>_3@'], '6:5'), (['BinaryOp:-', 'Constant:int,100', 'Constant:int,1'], '6:16'), (['Constant:int,100'], '6:16'), (['Constant:int,1'], '6:20'), (["Constant:char,'\\0'"], '6:25'), (['Assignment:=', 'ID:_<id>_1@', 'ID:_<id>_3@'], '7:5'), (['ID:_<id>_1@'], '7:5'), (['ID:_<id>_3@'], '7:12'), (['Compound', 'Decl:_<id>_13@', 'FuncCall', 'Assignment:=', 'FuncCall', 'FuncCall'], '8:1'), (['Decl:_<id>_13@', 'ArrayDecl'], '9:14'), (['ArrayDecl', 'TypeDecl:_<id>_13@', 'Constant:int,100'], '9:14'), (['TypeDecl:_<id>_13@', 'IdentifierType:char'], '9:14'), (['IdentifierType:char'], '9:9'), (['Constant:int,100'], '9:21'), (['FuncCall', 'ID:_<id>_7@', 'ExprList'], '10:9'), (['ID:_<id>_7@'], '10:9'), (['ExprList', 'ID:_<id>_13@', "Constant:char,'C'", 'BinaryOp:-'], '10:16'), (['ID:_<id>_13@'], '10:16'), (["Constant:char,'C'"], '10:24'), (['BinaryOp:-', 'Constant:int,100', 'Constant:int,1'], '10:29'), (['Constant:int,100'], '10:29'), (['Constant:int,1'], '10:33'), (['Assignment:=', 'ArrayRef', "Constant:char,'\\0'"], '11:9'), (['ArrayRef', 'ID:_<id>_13@', 'BinaryOp:-'], '11:9'), (['ID:_<id>_13@'], '11:9'), (['BinaryOp:-', 'Constant:int,100', 'Constant:int,1'], '11:16'), (['Constant:int,100'], '11:16'), (['Constant:int,1'], '11:20'), (["Constant:char,'\\0'"], '11:25'), (['FuncCall', 'ID:_<id>_14@', 'ExprList'], '12:9'), (['ID:_<id>_14@'], '12:9'), (['ExprList', 'ID:_<id>_1@', 'ID:_<id>_13@'], '12:16'), (['ID:_<id>_1@'], '12:16'), (['ID:_<id>_13@'], '12:22'), (['FuncCall', 'ID:_<id>_15@', 'ExprList'], '13:9'), (['ID:_<id>_15@'], '13:9'), (['ExprList', 'ID:_<id>_1@'], '13:19'), (['ID:_<id>_1@'], '13:19'), (['FuncDef', 'Decl:_<id>_17@', 'Compound'], '17:6'), (['Decl:_<id>_17@', 'FuncDecl'], '17:6'), (['FuncDecl', 'TypeDecl:_<id>_17@'], '17:6'), (['TypeDecl:_<id>_17@', 'IdentifierType:void'], '17:6'), (['IdentifierType:void'], '17:1'), (['Compound', 'FuncCall'], '18:1'), (['FuncCall', 'ID:_<id>_0@'], '19:5'), (['ID:_<id>_0@'], '19:5')]`,
        sppm_rate: 0.968,
        edits: ` ('delete', (['If', 'Constant:int,1', 'Compound'], '7:5')), ('delete', (['Constant:int,1'], '7:8')), ('delete', (['Compound', 'Assignment:='], '8:1')), ('delete', (['Assignment:=', 'ID:_2_@', 'BinaryOp:-'], '9:9')), ('delete', (['ID:_2_@'], '9:9')), ('delete', (['BinaryOp:-', 'ID:_2_@', 'Constant:int,8'], '9:16')), ('delete', (['ID:_2_@'], '9:16'))`,
        edits_top5: ['if,7','1,7','data,9','dataBuffer,9','-,9'],
        dmm_line: '9,1',
        dmm_top5: ['-,9','8,9','data,9','dataBuffer,9','if,7']
    }
]
export default codeData;