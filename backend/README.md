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

    矿机总数 显示到后台，还没有做。    
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
        实名认证：身份信息+三张图片上传 后台接收保存。等待审核。
        矿协通知：构造数据即可

        365倒计时 svg
        奇偶颜色不同

        添加矿机，记账：空头奖励
        判断状态。是否给奖励，是否升级等等。
    合计数字 不对，合计矿机总数不对。
    我命名开的是2类空寂，记账显示开通一类矿机。
    实名认证：都增加 holdplace 提示。
    需要强制刷新，才更换用户信息。否则还是上一个用户的信息。
    认证通过，才能开通。
    后台退出链接。以及 所有链接进行 默认链接的方式。验证。

    账号明细，类型不换行，适当控制表格显示。
    总算力 t 换算,在增加2位吧。

奖励计算：

    1、开通矿机的时候。 根据奖励进行计算。 
    2、每开通矿机 判断是否升级。
    3、每此升级需要判断上级是否需要升级。
    4、转账的时候也要判断。

    矿场奖励。

当前 每天一次升级。晚上进行。 因为升级消耗资源。


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



update adminuser
set adminuser.amount = adminuser.amount+ehclist.output from adminuser, ehclist
where adminuser.type=ehclist.id


SELECT sum(au.level) as count FROM usertree as ut, adminuser as au
where ut.user_id=au.id and ut.parent_id=3
order by au.level DESC LIMIT 0,3

SELECT concat(au.level) as count FROM usertree as ut, adminuser as au where ut.user_id=au.id and ut.parent_id=3 order by au.level DESC LIMIT 0,3






# 测试概要


## 前端：



    1 添加矿机

    矿机类型 从2开始
    颜色风格
    * 注意都放入 本地存储 比如密码。

# 10.7日 待修改

    验证码颜色：Tp image.class.php  386行

    图形验证码，功能后台。
    验证码点击更换。

    后台的链接 改为传统链接。
    后台所有的文字标签，修改正确。
    写一个cron.php 用于发放奖励。

上传图片好像也有问题。没有填写身份证号，无法提交。
验证通过后，需要刷新 才显示已通过。默认不刷新。
    接短信通道。
    手机不能登录。
    不能给不存在的人转账。
logo 改一下，app 图标改一下。
    前台开通矿机显示的价格不对。
后台更新支付密码失败。
显示一下用户的 es1 等级
真实姓名 不显示 离开真实姓名，身份证号自动消失
数据后台 不通过，前台没有刷新，必须强制刷新。



后台测试报告：(已测)

矿机类型
总量管理
添加矿机
    添加成功，父子关系建立成功

矿机列表
    以及前台认证流程 OK


2018.10.19------------

数据不刷新
上传失败。



