-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2018-09-27 23:19:42
-- 服务器版本： 5.7.21-0ubuntu0.16.04.1
-- PHP 版本： 5.6.37-1+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `wk`
--

-- --------------------------------------------------------

--
-- 表的结构 `access`
--

CREATE TABLE `access` (
  `id` int(10) UNSIGNED NOT NULL,
  `level` tinyint(1) NOT NULL,
  `module` varchar(45) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `node_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `access`
--

INSERT INTO `access` (`id`, `level`, `module`, `role_id`, `node_id`) VALUES
(26, 1, NULL, 5, 1),
(473, 1, NULL, 2, 1),
(551, 3, NULL, 6, 95),
(552, 2, NULL, 6, 94),
(553, 1, NULL, 6, 1),
(554, 3, NULL, 6, 97);

-- --------------------------------------------------------

--
-- 表的结构 `account`
--

CREATE TABLE `account` (
  `id` int(11) UNSIGNED NOT NULL,
  `amount` float(10,2) NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT '0',
  `efrom` varchar(64) NOT NULL,
  `eto` varchar(64) NOT NULL,
  `createtime` int(14) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `account`
--

INSERT INTO `account` (`id`, `amount`, `type`, `efrom`, `eto`, `createtime`) VALUES
(1, 201.00, 2, '天上掉馅饼', 'demo1', 1537698076),
(2, 202.00, 2, '天上掉馅饼', 'demo2', 1537706619),
(3, 2001.00, 2, '天上掉馅饼', 'demo2', 1537710899),
(4, 100.00, 2, '天上掉馅饼', 'demo1_1', 1537781826),
(5, 1.00, 2, '天上掉馅饼', 'demo1_1_1', 1537781889),
(6, 2000.00, 2, '天上掉馅饼', 'admin', 1537963091),
(7, 100.00, 1, 'admin', 'user1', 1537970676),
(8, 100.00, 0, 'admin', 'user1', 1537970879),
(9, 100.00, 0, 'admin', 'user1', 1537970937),
(10, 100.00, 0, 'admin', 'user1', 1537972045),
(11, 100.00, 0, 'admin', 'user4', 1537973262);

-- --------------------------------------------------------

--
-- 表的结构 `adminuser`
--

CREATE TABLE `adminuser` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(45) NOT NULL,
  `pwd` varchar(45) NOT NULL,
  `cpwd` varchar(45) NOT NULL,
  `tel` varchar(11) NOT NULL,
  `email` varchar(64) NOT NULL,
  `createtime` int(14) UNSIGNED NOT NULL,
  `lastlogin` varchar(45) DEFAULT NULL,
  `type` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `level` tinyint(1) UNSIGNED NOT NULL DEFAULT '0',
  `amount` double(15,2) UNSIGNED NOT NULL DEFAULT '0.00',
  `state` tinyint(1) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `adminuser`
--

INSERT INTO `adminuser` (`id`, `username`, `pwd`, `cpwd`, `tel`, `email`, `createtime`, `lastlogin`, `type`, `level`, `amount`, `state`) VALUES
(3, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'bae5e3208a3c700e3db642b6631e95b9', '', '', 1537690704, '1538056367', 1, 0, 5200.00, 0),
(9, 'adminuser2', 'f5bb0c8de146c67b44babbf4e6584cc0', '', '', '', 1537690704, '1459951871', 1, 0, 0.00, 0),
(10, 'adminuser3', 'f5bb0c8de146c67b44babbf4e6584cc0', '', '', '', 1537690704, '1460040840', 1, 0, 0.00, 0),
(11, 'adminuser4', 'f5bb0c8de146c67b44babbf4e6584cc0', '', '', '', 1537690704, '1460040859', 1, 0, 0.00, 0),
(12, 'adminuser5', 'f5bb0c8de146c67b44babbf4e6584cc0', '', '', '', 1537690704, '1460908763', 1, 0, 0.00, 0),
(13, 'testadmin', 'b2a9a16d67bddbb905264b3136f3c831', '', '', '', 1537690704, '1508989287', 1, 0, 0.00, 0),
(17, 'demo1', '1bbd886460827015e5d605ed44252251', 'd0521106f6ba7f9ac0a7370fb28d0ec6', '15081880198', '333@111.com', 1537690704, '1537690704', 1, 1, 201.00, 1),
(19, 'demo2', '1bbd886460827015e5d605ed44252251', 'd0521106f6ba7f9ac0a7370fb28d0ec6', '15081880198', '333@111.com', 1537710784, '1537710784', 1, 0, 2001.00, 0),
(20, 'demo1_1', '1bbd886460827015e5d605ed44252251', 'd0521106f6ba7f9ac0a7370fb28d0ec6', '15081880198', '333@111.com', 1537781790, '1537781790', 1, 0, 100.00, 0),
(21, 'demo1_1_1', '1bbd886460827015e5d605ed44252251', 'd0521106f6ba7f9ac0a7370fb28d0ec6', '15081880198', '333@111.com', 1537781867, '1537781867', 1, 0, 1.00, 0),
(27, 'user1', '1bbd886460827015e5d605ed44252251', 'd41d8cd98f00b204e9800998ecf8427e', '15088888888', '3234@wer.com', 1537798938, NULL, 1, 0, 1000.00, 0),
(28, 'user2', '1bbd886460827015e5d605ed44252251', 'd41d8cd98f00b204e9800998ecf8427e', '15088888888', '3234@wer.com', 1537800777, NULL, 1, 0, 0.00, 0),
(29, 'user21', '1bbd886460827015e5d605ed44252251', 'd41d8cd98f00b204e9800998ecf8427e', '15088888888', '3234@wer.com', 1537966109, NULL, 1, 0, 0.00, 0),
(30, 'user31', '1bbd886460827015e5d605ed44252251', 'd41d8cd98f00b204e9800998ecf8427e', '15088888888', '3234@wer.com', 1537966445, NULL, 1, 0, 0.00, 0),
(31, 'user3', '1bbd886460827015e5d605ed44252251', 'bae5e3208a3c700e3db642b6631e95b9', '15088888888', '3234@wer.com', 1537972001, NULL, 1, 0, 0.00, 0),
(39, 'user4', '1bbd886460827015e5d605ed44252251', 'bae5e3208a3c700e3db642b6631e95b9', '15088888888', '3234@wer.com', 1537973234, NULL, 1, 0, 100.00, 0);

-- --------------------------------------------------------

--
-- 表的结构 `conf`
--

CREATE TABLE `conf` (
  `id` int(11) UNSIGNED NOT NULL,
  `mtotal` int(10) UNSIGNED NOT NULL,
  `mt_add` int(11) NOT NULL,
  `ehctotal` double(15,2) NOT NULL,
  `et_add` double(15,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `conf`
--

INSERT INTO `conf` (`id`, `mtotal`, `mt_add`, `ehctotal`, `et_add`) VALUES
(1, 11, 1000, 22.00, 2000.00);

-- --------------------------------------------------------

--
-- 表的结构 `ehclist`
--

CREATE TABLE `ehclist` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `price` int(6) UNSIGNED NOT NULL,
  `output` float(5,2) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `ehclist`
--

INSERT INTO `ehclist` (`id`, `name`, `price`, `output`) VALUES
(1, '一类矿机', 800, 5.13),
(2, '二类矿机', 3000, 19.23),
(3, '三类矿机', 5000, 35.21),
(4, '四类矿机', 10000, 79.36),
(5, '五类矿机', 50000, 423.70);

-- --------------------------------------------------------

--
-- 表的结构 `node`
--

CREATE TABLE `node` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(45) NOT NULL,
  `title` varchar(45) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `remark` varchar(255) DEFAULT NULL,
  `sort` varchar(45) DEFAULT '0',
  `pid` varchar(45) NOT NULL DEFAULT '0',
  `level` tinyint(1) NOT NULL,
  `iconCls` varchar(100) DEFAULT NULL,
  `is_show` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `node`
--

INSERT INTO `node` (`id`, `name`, `title`, `status`, `remark`, `sort`, `pid`, `level`, `iconCls`, `is_show`) VALUES
(1, 'adminmenu', '后台菜单', 1, '后台的顶级菜单', '0', '0', 1, NULL, 1),
(2, 'homemenu', '前端菜单', 1, '前台顶级菜单', '0', '0', 1, NULL, 1),
(47, 'Rbac', '权限管理', 1, '', '0', '1', 2, '', 1),
(48, 'manageadmin', '管理员管理', 1, '', '0', '47', 3, 'icon-user_suit', 1),
(49, 'adminadd', '添加管理员', 1, '', '0', '47', 3, '', 0),
(50, 'adminedit', '编辑管理员', 1, '', '0', '47', 3, '', 0),
(51, 'admindel', '删除', 1, '', '0', '47', 3, '', 0),
(52, 'managerole', '角色管理', 1, '', '0', '47', 3, 'icon-group', 1),
(53, 'roleadd', '添加权限', 1, '', '0', '47', 3, '', 0),
(54, 'roleedit', '编辑', 1, '', '0', '47', 3, '', 0),
(55, 'roledel', '删除', 1, '', '0', '47', 3, '', 0),
(56, 'manageroleuser', '管理组成员', 1, '', '0', '47', 3, '', 0),
(57, 'editroleuser', '编辑组成员', 1, '', '0', '47', 3, '', 0),
(58, 'managenode', '节点管理', 1, '', '0', '47', 3, 'icon-note_edit', 1),
(59, 'nodeadd', '添加节点', 1, '', '0', '47', 3, '', 0),
(60, 'editnode', '编辑节点', 1, '', '0', '47', 3, '', 0),
(61, 'delnode', '删除节点', 1, '', '0', '47', 3, '', 0),
(94, 'Ehc', '矿机管理', 1, '矿机价格列表', '0', '1', 2, '', 1),
(95, 'typemanage', '矿机类型', 1, '', '0', '94', 3, 'icon-ruby_gear', 1),
(96, 'totalmanage', '总量管理', 1, '', '0', '94', 3, 'icon-award_star_gold_2', 1),
(97, 'add', '添加矿机', 1, '', '0', '94', 3, 'icon-award_star_gold_3', 1),
(98, 'Notice', '公告管理', 1, '', '0', '1', 2, 'icon-application_put', 1),
(99, 'manage', '公告列表', 1, '', '0', '98', 3, 'icon-application_side_expand', 1),
(100, 'add', '添加公告', 1, '', '0', '98', 3, 'icon-add', 1),
(101, 'Account', '账目管理', 1, '', '0', '1', 2, 'icon-application_view_columns', 1),
(102, 'manage', '账目列表', 1, '', '0', '101', 3, 'icon-application_view_list', 1),
(103, 'award', '空投奖励', 1, '', '0', '101', 3, 'icon-arrow_branch', 1),
(104, 'manage', '矿机列表', 1, '', '0', '94', 3, 'icon-application_view_list', 1);

-- --------------------------------------------------------

--
-- 表的结构 `notice`
--

CREATE TABLE `notice` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `createtime` int(14) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `notice`
--

INSERT INTO `notice` (`id`, `title`, `content`, `createtime`) VALUES
(2, '【矿协通知】社区二阶段奖励通知23', '   1接到社区通知，首先恭喜本次见面会圆满结束，本次见面会除了让各位中华区玩家和新加坡EHC项目团队见面交流以外，社区也完成了第一阶段的奖励计划，第一阶段截止项目见面会社区共计发出10台奔驰车，30个价值万元的EHC黄金纪念币，相信这些奖励不仅是对于这一个多月以来社区对各位优秀玩家的一个鼓励，更多的也是对社区所有玩家的一个激励，希望各位玩家再接再厉，共创EHC辉煌。\r\n\r\n    第一阶段的奖励计划虽然名额已经全部用完，社区也完成承诺实现了相应的奖励，但这只是开始，接到社区通知，社区正在制定第二阶段的奖励政策，也希望各位玩家积极参与，不要错过第二阶段的奖励，不要再做那个吃螃蟹的观望着，一定要做吃螃蟹的人，希望更多后起之秀获得第二阶段的奖励。大家再接再厉，勇往直前，EHC社区一定给大家最好的回报。', 1537674621),
(3, '【矿协通知】社区二阶段奖励通知3', '【矿协通知】社区二阶段奖励通知3', 1537675395);

-- --------------------------------------------------------

--
-- 表的结构 `realname`
--

CREATE TABLE `realname` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `realname` varchar(12) NOT NULL,
  `idnumber` varchar(18) NOT NULL,
  `state` tinyint(1) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `realname`
--

INSERT INTO `realname` (`id`, `user_id`, `realname`, `idnumber`, `state`) VALUES
(1, 17, '张三', '130406111111111111', 2),
(2, 19, '李四', '111333444444444444', 2),
(3, 3, '王五', '13333333334434', 2);

-- --------------------------------------------------------

--
-- 表的结构 `relation`
--

CREATE TABLE `relation` (
  `id` int(11) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `r_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `relation`
--

INSERT INTO `relation` (`id`, `user_id`, `r_id`) VALUES
(4, 3, 17),
(7, 3, 19),
(9, 3, 27);

-- --------------------------------------------------------

--
-- 表的结构 `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `pid` varchar(45) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `remark` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `role`
--

INSERT INTO `role` (`id`, `name`, `pid`, `status`, `remark`) VALUES
(1, '超级管理员', NULL, 1, '该角色拥有本站的所有权限'),
(2, '管理员', NULL, 1, '该角色具有商品管理功能'),
(3, '站长', NULL, 1, '该用户具有某一特定功能'),
(5, '普通管理员', NULL, 1, '所有新建管理员默认角色'),
(6, ' 测试角色', NULL, 1, '测试角色，用来测试本权限管理系统，基础模块。');

-- --------------------------------------------------------

--
-- 表的结构 `roleuser`
--

CREATE TABLE `roleuser` (
  `id` int(11) NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `roleuser`
--

INSERT INTO `roleuser` (`id`, `user_id`, `role_id`) VALUES
(29, 11, 2),
(31, 9, 2),
(33, 10, 1),
(34, 11, 1),
(35, 3, 1),
(36, 12, 2),
(40, 9, 3),
(41, 10, 3),
(46, 13, 2);

-- --------------------------------------------------------

--
-- 表的结构 `usertree`
--

CREATE TABLE `usertree` (
  `id` int(11) NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `parent_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `usertree`
--

INSERT INTO `usertree` (`id`, `user_id`, `parent_id`) VALUES
(1, 17, 3),
(3, 19, 3),
(4, 20, 17),
(5, 21, 20),
(6, 27, 3),
(7, 28, 3),
(8, 29, 3),
(9, 30, 3),
(10, 31, 3),
(11, 39, 3);

--
-- 转储表的索引
--

--
-- 表的索引 `access`
--
ALTER TABLE `access`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_access_role1_idx` (`role_id`),
  ADD KEY `fk_access_node1_idx` (`node_id`);

--
-- 表的索引 `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `adminuser`
--
ALTER TABLE `adminuser`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- 表的索引 `conf`
--
ALTER TABLE `conf`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `ehclist`
--
ALTER TABLE `ehclist`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `node`
--
ALTER TABLE `node`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `notice`
--
ALTER TABLE `notice`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `realname`
--
ALTER TABLE `realname`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `relation`
--
ALTER TABLE `relation`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rel_id` (`user_id`,`r_id`);

--
-- 表的索引 `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `roleuser`
--
ALTER TABLE `roleuser`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_roleuser_adminuser1_idx` (`user_id`),
  ADD KEY `fk_roleuser_role1_idx` (`role_id`);

--
-- 表的索引 `usertree`
--
ALTER TABLE `usertree`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `access`
--
ALTER TABLE `access`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=555;

--
-- 使用表AUTO_INCREMENT `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- 使用表AUTO_INCREMENT `adminuser`
--
ALTER TABLE `adminuser`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- 使用表AUTO_INCREMENT `conf`
--
ALTER TABLE `conf`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `ehclist`
--
ALTER TABLE `ehclist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 使用表AUTO_INCREMENT `node`
--
ALTER TABLE `node`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- 使用表AUTO_INCREMENT `notice`
--
ALTER TABLE `notice`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `realname`
--
ALTER TABLE `realname`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `relation`
--
ALTER TABLE `relation`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- 使用表AUTO_INCREMENT `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 使用表AUTO_INCREMENT `roleuser`
--
ALTER TABLE `roleuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- 使用表AUTO_INCREMENT `usertree`
--
ALTER TABLE `usertree`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- 限制导出的表
--

--
-- 限制表 `access`
--
ALTER TABLE `access`
  ADD CONSTRAINT `fk_access_node1` FOREIGN KEY (`node_id`) REFERENCES `node` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_access_role1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- 限制表 `roleuser`
--
ALTER TABLE `roleuser`
  ADD CONSTRAINT `fk_roleuser_adminuser1` FOREIGN KEY (`user_id`) REFERENCES `adminuser` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_roleuser_role1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- 限制表 `usertree`
--
ALTER TABLE `usertree`
  ADD CONSTRAINT `fk_parent_id` FOREIGN KEY (`parent_id`) REFERENCES `adminuser` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `adminuser` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
