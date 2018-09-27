<?php
class AccountModel extends Model {
	protected $_validate = array(
		array('amount','number','金额必须为数字'),
		array('type','require','类型不能为空'),
		array('fromid','require','来源不能为空'),
		array('toid','require','去向不能为空')
	);
}
?>