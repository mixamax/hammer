import React, { Component } from 'react';
import { Avatar, Drawer, Divider } from 'antd';

export class UserView extends Component {
	render() {
		const { data, visible, close} = this.props;
		return (
			<Drawer
				width={300}
				placement="right"
				onClose={close}
				closable={false}
				visible={visible}
                onClick={() => console.log("clicked")}
			>
				<div className="text-center mt-3">
					<Avatar size={80} src={data?.image} />
					<h3 className="mt-2 mb-0">{data?.firstName}</h3>
				</div>
				<Divider dashed />
			</Drawer>
		)
	}
}

export default UserView
