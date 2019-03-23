import React from 'react';

export default class NewsItem extends React.Component {
	// static propTypes = {
	// 	name: PropTypes.string,
	// };

	constructor(props) {
		super(props);
	}

	render() {
		const heading = this.props.itemHeading;
		const data = this.props.itemData;

		console.log(data);
		return (
			<div>
				<h2>{ heading }</h2>
				<p>{ data }</p>
			</div>
		);
	}
}
