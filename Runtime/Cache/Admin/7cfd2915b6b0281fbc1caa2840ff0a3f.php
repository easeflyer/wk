<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>添加节点</title>
    <link rel="stylesheet" type="text/css" href="__SKIN__plugin/ui/themes/__THEME__/easyui.css" />
<link rel="stylesheet" type="text/css" href="__SKIN__plugin/ui/themes/icon.css" />
<script type="text/javascript" src="__SKIN__plugin/ui/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="__SKIN__plugin/ui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="__SKIN__plugin/ui/locale/easyui-lang-zh_CN.js"></script>
<style type="text/css">
*{ margin:0; padding:0; color:#363636}
a{text-decoration:none; color:#000}

</style>

    <link rel="stylesheet" type="text/css" href="__SKIN__css/tableform.css" />
   <script type="text/javascript">
        function refreshpid(_level){
            $("#parentid").combotree({
                   url:'index.php?g=Admin&m=Rbac&a=combotreejson&level='+_level,
                   
                   value:1

                });
        }
        $(function(){
            refreshpid(999); // 本句原来没有 所有选择上级分类 不显示 参数 Level 显示多少级节点 也就是节点的深度。
            $('#win').window({  
            width:600,  
            height:400,  
            modal:true,
            title:'选择图标',
            iconCls:'icon-map',
            resizable:false,
            collapsible:false,
            minimizable:false,
            maximizable:false,
            closed:true 
        });
        // 此方法是 jquery-easyui 的方法 作用于 #win div  参见 easyui window
          $('#win').window('refresh','index.php?g=admin&m=Rbac&a=getallicons');
          // 注意此处是从 ajax 加载的内容。因此内容 加入 当前 dom 模型中。载入的内容中包含
          // $('#icon').val('icon-'+this.alt); 是对本页面的赋值。

    })
        function showwin(){
            $('#win').window('open');
        }
       
   </script>
</head>

<body>
    <div class="easyui-panel" data-options="
	title:'添加节点',
	border:false,
	iconCls:'icon-note_add'
">
        <form name="f1" action="" method="POST" enctype="multipart/form-data">
            <table class="table-form" border="1" width="100%">
                <tr>
                    <th>节点名称(英文)</th>
                    <td>
                        <input type="text" name="name" class="ipt" required>
                    </td>
                </tr>
                
                <tr>
                    <th>菜单名称</th>
                    <td>
                        <input type="text" name="title" class="ipt" required style="width:200px;">
                    </td>
                </tr>
                <tr>
                    <th>图标</th>
                    <td>
                        <input type="text" name="iconCls" class="ipt" id="icon">&nbsp;&nbsp;
                            <a href="javascript:void(0)"  class="easyui-linkbutton" data-options="iconCls:'icon-folder_magnify'" onclick="showwin()">浏览</a>
                    </td>
                </tr>
                <tr>
                    <th>级别</th>
                    <td>
                        <select id="sssl" name="level" onchange="refreshpid(this.value)" >
                            <option value="1">项目</option>
                            <option value="2">模块</option>
                            <option value="3">操作</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>上级菜单</th>
                    <td>
                       <input id="parentid" name="pid" type="text" style="width: 300px" class="easyui-combotree" 
                        data-options="" />
                    </td>
                </tr>
                <tr>
                    <th>是否禁用</th>
                    <td>
                       否&nbsp;&nbsp;&nbsp;<input type="radio" name="status" value="1" checked="" />&nbsp;&nbsp;&nbsp;是&nbsp;&nbsp;&nbsp;<input type="radio" name="status" value="0" />
                    </td>
                </tr>
                <tr>
                    <th>是否显示</th>
                    <td>
                       是&nbsp;&nbsp;&nbsp;<input type="radio" name="is_show" value="1" checked="" />&nbsp;&nbsp;&nbsp;否&nbsp;&nbsp;&nbsp;<input type="radio" name="is_show" value="0" />
                    </td>
                </tr>
                <tr>
                    <th>说明</th>
                    <td>
                        <textarea name="remark"  cols="65" rows="10"></textarea>
                    </td>
                </tr>
                
                <tr>
                    <th></th>
                    <td>
                        <input type="submit" name="s1" value="提交">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="reset" name="r1" value="清除">
                    </td>
                </tr>

            </table>
        </form>
    </div>
    <div id="win"></div>
</body>

</html>