<?php
/**
 * 只要继承自 CommonAction 就有了权限控制能力。参考rbac 相关笔记
 * 
 */

class DemoactAction extends CommonAction {
	
	function act1(){
		$this->display();
	}
	function act2(){
		$this->display();
	}
	function act3(){
		$this->display();
	}
}