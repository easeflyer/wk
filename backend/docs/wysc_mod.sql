-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2017 年 11 月 05 日 22:08
-- 服务器版本: 5.5.53
-- PHP 版本: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `wysc_mod`
--

-- --------------------------------------------------------

--
-- 表的结构 `access`
--

CREATE TABLE IF NOT EXISTS `access` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `level` tinyint(1) NOT NULL,
  `module` varchar(45) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `node_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_access_role1_idx` (`role_id`),
  KEY `fk_access_node1_idx` (`node_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=555 ;

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
-- 表的结构 `adminuser`
--

CREATE TABLE IF NOT EXISTS `adminuser` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `pwd` varchar(45) NOT NULL,
  `lastlogin` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- 转存表中的数据 `adminuser`
--

INSERT INTO `adminuser` (`id`, `username`, `pwd`, `lastlogin`) VALUES
(3, 'admin', '21232f297a57a5a743894a0e4a801fc3', '1509865476'),
(9, 'adminuser2', 'f5bb0c8de146c67b44babbf4e6584cc0', '1459951871'),
(10, 'adminuser3', 'f5bb0c8de146c67b44babbf4e6584cc0', '1460040840'),
(11, 'adminuser4', 'f5bb0c8de146c67b44babbf4e6584cc0', '1460040859'),
(12, 'adminuser5', 'f5bb0c8de146c67b44babbf4e6584cc0', '1460908763'),
(13, 'testadmin', 'b2a9a16d67bddbb905264b3136f3c831', '1508989287');

-- --------------------------------------------------------

--
-- 表的结构 `node`
--

CREATE TABLE IF NOT EXISTS `node` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `title` varchar(45) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `remark` varchar(255) DEFAULT NULL,
  `sort` varchar(45) DEFAULT '0',
  `pid` varchar(45) NOT NULL DEFAULT '0',
  `level` tinyint(1) NOT NULL,
  `iconCls` varchar(100) DEFAULT NULL,
  `is_show` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=98 ;

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
(94, 'demoact', '测试模块', 1, '这是一个测试模块', '0', '1', 2, '', 1),
(95, 'act1', '测试操作1', 1, '', '0', '94', 3, 'icon-award_star_gold_1', 1),
(96, 'act2', '测试操作2', 1, '', '0', '94', 3, 'icon-award_star_gold_2', 1),
(97, 'act3', '测试操作3', 1, '', '0', '94', 3, 'icon-award_star_gold_3', 1);

-- --------------------------------------------------------

--
-- 表的结构 `role`
--

CREATE TABLE IF NOT EXISTS `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `pid` varchar(45) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

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

CREATE TABLE IF NOT EXISTS `roleuser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_roleuser_adminuser1_idx` (`user_id`),
  KEY `fk_roleuser_role1_idx` (`role_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=46 ;

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
(45, 13, 6);

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
