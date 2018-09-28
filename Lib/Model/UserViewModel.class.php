<?php
class UserViewModel extends ViewModel {
		protected  $viewFields=array(
			'Adminuser'=>array('*','_type'=>'LEFT'),
			"Realname"=>array('realname','state'=>'rstate','_on'=>"Adminuser.id=Realname.user_id")
		);
}
?>