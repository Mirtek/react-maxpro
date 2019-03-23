import React from 'react';
import NewsItem from './NewsItem'

export default class NewsList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<ul>
				{Object.keys(this.props.newsList).map(
					key => <NewsItem key={key} itemHeading={this.props.newsList[key].H2} itemData={this.props.newsList[key].P} />
				)}
				</ul>
			</div>
		);
	}
}
