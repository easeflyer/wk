<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>矿机列表</title>
    <link rel="stylesheet" type="text/css" href="__SKIN__plugin/ui/themes/__THEME__/easyui.css" />
<link rel="stylesheet" type="text/css" href="__SKIN__plugin/ui/themes/icon.css" />
<script type="text/javascript" src="__SKIN__plugin/ui/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="__SKIN__plugin/ui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="__SKIN__plugin/ui/locale/easyui-lang-zh_CN.js"></script>
<style type="text/css">
*{ margin:0; padding:0; color:#363636}
a{text-decoration:none; color:#000}

</style>

    <script type="text/javascript">
        function createop(_v, _r) {
            return "<a href='index.php?g=admin&m=Ehc&a=useredit&id=" + _r.id + "' class='easyui-linkbutton' data-options='iconCls:\"icon-vcard_edit\"'>编辑</a>\n\
            <a href='javascript:void(0)'  onclick='confirmdel(" + _r.id + ")' class='easyui-linkbutton'   data-options='iconCls:\"icon-vcard_edit\"'>删除</a>";
        }
        function renderbutton() {
            $('a.easyui-linkbutton').linkbutton({
                plain: true
            });
        }



        function confirmdel(_id) {
            $.messager.confirm('确认删除', '是否确认删除该级别', function (r) {
                if (r) {
                    window.location.href = 'index.php?g=admin&m=Ehc&a=userdel&id=' + _id;
                }
            });
        }
    </script>
</head>

<body>
    <div class="easyui-panel" data-options="
             title:'用户级别管理',
             border:false,
             iconCls:'icon-vcard'
             ">
        <table class="easyui-datagrid" data-options="
                   border:false,
                   fitColumns:true,
                   toolbar:'#toolbar',
                   onLoadSuccess:renderbutton
                   ">
            <thead>
                <th data-options="
                        field:'id',
                        align:'center', 
                        width:20">id</th>
                <th data-options="
                        field:'username',
                        width:100">矿主</th>
                <th data-options="
                        field:'realname',
                        width:100">实名</th>
                <th data-options="
                        field:'level',
                        width:100">等级</th>
                <th data-options="
                        field:'type',
                        width:100">类型</th>
                <th data-options="
                        field:'tel',
                        width:100">电话</th>
                <th data-options="
                        field:'email',
                        width:100">邮箱</th>
                <th data-options="
                        field:'amount',
                        width:100">金额</th>
                <th data-options="
                        field:'state',
                        width:100">状态</th>
                <th data-options="field:'opration',
                        width:150,
                        formatter:createop
                        ">操作</th>
            </thead>
            <tbody>
                <?php if(is_array($data)): $i = 0; $__LIST__ = $data;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$val): $mod = ($i % 2 );++$i;?><tr>
                        <td><?php echo ($val['id']); ?></td>
                        <td><?php echo ($val['username']); ?></td>
                        <td>
                            <?php echo ($val['realname']); ?>
                            <?php if($val[rstate] == 0): ?>(<a href="<?php echo U('Ehc/realname',array('id'=>$val[id]));?>}"><span style="color:orange">审核</span></a>)
                            <?php elseif($val[rstate] == 1): ?>
                                (<a href="<?php echo U('Ehc/realname',array('id'=>$val[id]));?>}"><span style="color:red">未通过</span></a>)
                            <?php else: ?>
                                (<a href="<?php echo U('Ehc/realname',array('id'=>$val[id]));?>}"><span style="color:green">已认证</span></a>)<?php endif; ?>
                        </td>
                        <td><?php echo ($level[$val['level']]); ?></td>
                        <td><?php echo ($type[$val['type']]); ?></td>
                        <td><?php echo ($val['tel']); ?></td>
                        <td><?php echo ($val['email']); ?></td>
                        <td><?php echo ($val['amount']); ?></td>
                        <td>
                            <?php if(($val['state'] == 0)): ?><span style="color:red"><?php echo ($state[$val['state']]); ?></span>
                                <?php else: ?>
                                <span style="color:green"><?php echo ($state[$val['state']]); ?></span><?php endif; ?>
                        </td>
                    </tr><?php endforeach; endif; else: echo "" ;endif; ?>
            </tbody>
        </table>

        <div id="toolbar">
            <a href="<?php echo U('Ehc/add');?>" class=" easyui-linkbutton" data-options="plain:true,iconCls:'icon-vcard_add'"
                disabled>添加矿机</a>
        </div>
    </div>
</body>

</html>