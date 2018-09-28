项目说明
========

本项目目的是把 管理员、权限、节点 三个bs软件开发中经常要用到的模块，分离出来，进行解耦。
使得以上三个模块可以在开发其他系统时，无需重复开发，直接拿来即可使用。因此需要对以上3个模块
进行充分的解耦，删除没必要的文件以及数据库表。使得这3个模块时“干净的”3个独立的模块。

管理员模块：是所有登录后台管理的用户列表。对应 adminuser 表
权限模块：是控制不同的角色和管理员具有不同的操作权限。包括对5个表的操作， access(角色节点表) role(角色表) roleuser(角色用户表) node(节点表) adminuser(管理员表)


功能说明
--------


http://kj.ehcoin.io
niuchunyu001
123456
http://192.168.0.112/backend/index.php/Admin/Admin

开发进度
--------
jquery-easyui 的例子再看一下。
然后就可以写后台了。

顺序：

    ehclist     矿机等级价格表 （已完成）
    conf        总配置表，（已完成）
    adminuser   新建用户
    realname    实名认证
    relation    添加关联


后台：（全部已完成）
    空投奖励：表单， 更新用户表，账目表
    新建用户和用户管理，因为 最初的用户必须建立。同时发放一定的ehc,用户审核。
        新建：用户资料，usertree
    账目列表
    矿机列表 编辑功能。

    cron.php    定期发放奖励，处理其他必要的事项。

前台：
        登录 session
        系统概况 全部数据 ajax
        新建用户也就是新增矿机
        本人账号明细 正负ehc 其他都简单
        关联矿机，输入对方账号，写relation 表即可。
        关联矿机列表
        内部转账：账号 数量 密码 短信
        
        个人资料：修改 登录密码 支付密码 其他都不能修改 展示包括实名
    实名认证：身份信息+三张图片上传 后台接收保存。等待审核
        矿协通知：构造数据即可


奖励计算：

    1、开通矿机的时候。 根据奖励进行计算。
    2、每开通矿机 判断是否升级。
    3、每此升级需要判断上级是否需要升级。

    矿场奖励。


function updateUser(u){
    if(chk(u)){
        u1 升级
        updateUser(u1 父节点)
    }
}


0-9  10个等级
0级 初级。

1    1 级  es1      
2    2     2        1
3    3     3        2
4    c1    5        5
5    c2    6        6
6    c3    9        9
7    o1    15       12
8    o2    21       15
9    o3    27       18


SELECT ut.*,au.* FROM  usertree as ut  LEFT JOIN adminuser as au ON ut.user_id=au.id and ut.parent_id=3


SELECT count(au.level) as count FROM usertree as ut, adminuser as au where ut.user_id=au.id and ut.parent_id=3 order by au.level DESC LIMIT 0,3
