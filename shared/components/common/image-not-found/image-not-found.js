import Cx from 'classnames';

const ImageNotFound = (props) => {
	const { textToShow, classNames } = props;
	return (
		<div className={`${Cx('img-not-found',classNames)}`}>
			<p>{textToShow}</p>
		</div>
	);
};

export default ImageNotFound;
