import RootListComponent from './components/root-list/root-list';
import ImageComponent from './components/image/image';
import ImageGallery from './components/image-gallery/image-gallery';
import CustomOpenHouse from './components/custom/openhouse/openhouse';

const defaultComponentIndex =  {
	'root' : RootListComponent,
	'image' : ImageComponent,
	'image-gallery' : ImageGallery,
	'open-house' : CustomOpenHouse
};

export default defaultComponentIndex;
