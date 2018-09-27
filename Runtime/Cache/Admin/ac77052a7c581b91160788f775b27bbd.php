<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>添加矿机</title>
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
</head>

<body>
    <div class="easyui-panel" data-options="
	title:'用户级别',
	border:false,
	iconCls:'icon-vcard_add'
">
        <form name="f1" action="" method="POST" enctype="multipart/form-data">
            <table class="table-form" border="1" width="100%">
                <tr>
                    <th>矿主</th>
                    <td><input type="text" name="username" class="ipt"></td>
                </tr>
                <tr>
                    <th>上级矿主</th>
                    <td><input type="text" name="pusername" class="ipt"></td>
                </tr>
                <tr>
                    <th>类型</th>
                    <td>
                            <select name='type'>
                                    <?php if(is_array($type)): foreach($type as $i=>$val): ?><option value="<?php echo ($i); ?>"><?php echo ($val); ?></option><?php endforeach; endif; ?>
                                </select>
        
                    </td>
                </tr>
                <tr>
                    <th>等级</th>
                    <td>
                        <select name='level'>
                            <?php if(is_array($level)): foreach($level as $i=>$val): ?><option value="<?php echo ($i); ?>"><?php echo ($val); ?></option><?php endforeach; endif; ?>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>电话</th>
                    <td><input type="text" name="tel" class="ipt"></td>
                </tr>
                <tr>
                    <th>邮箱</th>
                    <td><input type="text" name="email" class="ipt"></td>
                </tr>
                <tr>
                    <th>登录密码</th>
                    <td><input type="text" name="pwd" class="ipt"></td>
                </tr>
                <tr>
                    <th>支付密码</th>
                    <td><input type="text" name="cpwd" class="ipt"></td>
                </tr>

                <tr>
                    <th></th>
                    <td><input type="submit" name="s1" value="提交">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="reset"
                            name="r1" value="清除"></td>
                </tr>
            </table>

        </form>
    </div>
</body>

</html>