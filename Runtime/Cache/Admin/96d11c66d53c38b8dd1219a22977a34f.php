<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>实名认证审核</title>
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
    <script>
        function op(id,state) {
            $.post("<?php echo U('Ehc/ckrname');?>", { id: id, state: state },
                function (data) {
                    if(data)$("#op").html("<span style=\"color:green\">已认证</span>");
                    else $("#op").html("<span style=\"color:red\">未通过</span>");
                });
        }
    </script>
</head>

<body>
    <div class="easyui-panel" data-options="
	title:'实名',
	border:false,
	iconCls:'icon-vcard_add'
">
        <form name="f1" action="" method="POST" enctype="multipart/form-data">
            <input type="hidden" name="id" value="<?php echo ($data[id]); ?>" />
            <table class="table-form" border="1" width="100%">
                <tr>
                    <th>真实姓名</th>
                    <td><?php echo ($data[realname]); ?></td>
                </tr>
                <tr>
                    <th>身份证号</th>
                    <td><?php echo ($data[idnumber]); ?></td>
                </tr>
                <tr>
                        <th>是否通过认证</th>
                        <td>
                            <div id="op">
                                <?php if($data[state] == 0): ?><input type="button" value="通过" onClick="op(<?php echo ($data[id]); ?>,2)" />
                                    <input type="button" value="不通过" onClick="op(<?php echo ($data[id]); ?>,1)" />
                                    <?php elseif($data[state] == 1): ?>
                                    <span style="color:red">未通过</span>
                                    <?php else: ?>
                                    <span style="color:green">已认证</span><?php endif; ?>
                            </div>
                        </td>
                    </tr>
                <tr>
                    <th>身份证正面</th>
                    <td><img src="__PUBLIC__/idImages/<?php echo ($data[idnumber]); ?>-f.jpg" /></td>
                </tr>
                <tr>
                    <th>身份证背面</th>
                    <td><img src="__PUBLIC__/idImages/<?php echo ($data[idnumber]); ?>-b.jpg" /></td>
                </tr>
                <tr>
                    <th>手持身份证</th>
                    <td><img src="__PUBLIC__/idImages/<?php echo ($data[idnumber]); ?>-h.jpg" /></td>
                </tr>


            </table>

        </form>
    </div>
</body>

</html>