// this is to dynamically load all big components as needed
/*import loadable from '@loadable/component';
import Loader from 'components/common/page-loader/loader';*/

// start components here
import TextComponent from './components/text/text';
import TextMaskedComponent from './components/text/text-masked';
//import TextDateComponent from './components/text/text-date';
import TextDateCustomeComponent from './components/text/text-date-new';
//import TextDateMaskedComponent from './components/text/text-date-masked';
import TextAreaComponent from './components/text/textarea';
import TextHiddenComponent from './components/text/text-hidden';
import TextReadComponent from './components/text/text-readonly';
import TextPasswordComponent from './components/text/text-password';
//import TextGooglePlaceComponent from './components/text/text-google-place';
import TextAjaxPopulateComponent from './components/text/text-ajax-populate';
import TextTimeComponent from './components/text/text-time';
//import TextEditorComponent from './components/text/text-editor';
import TextSuggestionComponent from './components/text/text-suggestion';
import TextCalculatorSuggestionComponent from './components/text/text-calculate-suggestion';

import HeaderComponent from './components/header/header';
import HeaderSubheaderComponent from './components/header/header-subheader';
import HeaderSubheaderAppendixComponent from './components/header/header-subheader-appendix';
import HeaderIconComponent from './components/header/header-icon';

import ListComponent from './components/default-component/default-list';
import ListInline from './components/list/list-inline';
import ListColumnsComponent from './components/list/list-columns';
import ListColumnsNoGutterComponent from './components/list/list-columns-no-gutter';
import ListRemovableComponent from './components/list/list-removable';
import ListRemovableSingleComponent from './components/list/list-removable-single';
import ListTabsComponent from './components/list/list-tabs';
import ListTabsSmallComponent from './components/list/list-tabs-small';
import ListTabsDropdownComponent from './components/list/list-tabs-dropdown';
import ListTabsSliderComponent from './components/list/list-tabs-slider';
import ListTabsRadioIconComponent from './components/list/list-tabs-icon-radio';
import ListTabsCollapse from './components/list/list-tabs-collapse';
import ListMultiTabs from './components/list/list-tabs-multi-select';
import ListTabsReadContent from './components/list/list-tabs-read-content';
import ListCollapsible from './components/list/list-collapsible';
import ListCollapsibleItem from './components/list/list-collapsible-item';

import DataGridComponent from './components/data/data-grid';

import DropdownComponent from './components/options/dropdown';
import SwitcherComponent from './components/options/switcher';
import SliderComponent from './components/options/slider';
import RadioComponent from './components/options/radio';
import IconRadioComponent from './components/options/icon-radio';
import RadioShortComponent from './components/options/radio-short';
import RadioTinyComponent from './components/options/radio-tiny';
import CheckboxComponent from './components/options/checkbox';
import IconCheckboxComponent from './components/options/icon-checkbox';
import IconCheckboxValuesComponent from './components/options/icon-checkbox-values';
import IconCheckboxShortComponent from './components/options/icon-checkbox-short';
import ToggleCheckboxComponent from './components/options/toggle-checkbox';
import SelectPillsComponent from './components/options/select-pills';
import PillComponent from './components/options/pill';
import MultiOptionsPillsComponent from './components/options/multi-options-pills';
import CloneComponent from './components/clone/clone';


import ContentComponent from './components/content/content';
import ContentTextComponent from './components/content/content-text';
import ContentTextListComponent from './components/content/content-text-list';
import ContentGridComponent from './components/content/content-grid';
import ContentMarkdownComponent from './components/content/content-markdown';
import ContentCalculatorComponent from './components/content/content-calculator';
import ContentList from './components/content/content-list';
import ContentLink from './components/content/content-link';
import ContentIFrame from './components/content/content-iframe';

import CardWrapperComponent from './components/cards/cards-wrapper';
import CardComponent from './components/cards/card';
import CardLargeComponent from './components/cards/card-large';
import CardFooterComponent from './components/cards/card-footer';

import CustomGroupElementsComponent from './components/custom/custom-group-elements';
import CustomMultiGroupElementsComponent from './components/custom/custom-multi-group-elements';
import CustomFormulaCalculator from './components/custom/custom-formula-calculator';
import CustomFormulaCalculatorText from './components/custom/custom-formula-calculator-text';
import CustomRatioBarComponent from './components/custom/custom-ratio-bar';
//import CustomCarouselWrapper from './components/custom/custom-carousel-wrapper';
import CustomExternalLinks from './components/custom/custom-external-links';
import CustomCalculatorAnimate from './components/custom/custom-calculator-animate';
import CustomStateSuggestionComponent from './components/custom/custom-state-suggestion';
import CustomCountrySuggestionComponent from './components/custom/custom-country-suggestion';
/*import CustomSearchSelect from './components/custom/custom-search-select';*/

import PopupComponent from './components/popup/popup';

import TableComponent from './components/table/table';
import TableHeaderComponent from './components/table/table-header';
import TableBodyComponent from './components/table/table-body';
import TableFooterComponent from './components/table/table-footer';
import TableRowComponent from './components/table/table-row';

//import ProfilePicComponent from './components/profile-pic/profile-pic';

//import ChartComponent from './components/charts/chart';

// Lazy loaded super heavy components
// add here


let DefaultComponentIndex = {
	'text': TextComponent,
	'text-mask': TextMaskedComponent,
	//'date': TextDateMaskedComponent,
	'text-date' : TextDateCustomeComponent,
	'text-area': TextAreaComponent,
	'text-hidden' : TextHiddenComponent,
	'text-read' : TextReadComponent,
	'text-password' : TextPasswordComponent,
	//'text-google-place' : TextGooglePlaceComponent,
	'text-ajax-populate' : TextAjaxPopulateComponent,
	'text-time' : TextTimeComponent,
	'text-suggestion' : TextSuggestionComponent,
	'text-calculate-suggestion' : TextCalculatorSuggestionComponent,
	//'text-editor' : TextEditorComponent,

	'options': TextComponent,
	'radio': RadioComponent,
	'radio-icon': IconRadioComponent,
	'checkbox': CheckboxComponent,
	'checkbox-icon': IconCheckboxComponent,
	'checkbox-icon-values': IconCheckboxValuesComponent,
	'checkbox-icon-short': IconCheckboxShortComponent,
	'toggle' : ToggleCheckboxComponent,
	'radio-short': RadioShortComponent,
	'radio-tiny': RadioTinyComponent,
	'dropdown': DropdownComponent,
	'slider': SliderComponent,
	'switcher': SwitcherComponent,
	'select-pills': SelectPillsComponent,
	'pill' : PillComponent,
	'multi-select-pills' : MultiOptionsPillsComponent,

	'header': HeaderComponent,
	'header-icon': HeaderIconComponent,
	'header-subheader': HeaderSubheaderComponent,
	'header-subheader-appendix':HeaderSubheaderAppendixComponent,

	'card': CardComponent,
	'card-large': CardLargeComponent,
	'card-wrapper' : CardWrapperComponent,
	'card-footer' : CardFooterComponent,


	'list': ListComponent,
	'list-inline': ListInline,
	'list-columns': ListColumnsComponent,
	'list-columns-no-gutter': ListColumnsNoGutterComponent,
	'list-removable': ListRemovableComponent,
	'list-removable-single': ListRemovableSingleComponent,
	'list-tabs': ListTabsComponent,
	'list-tabs-small': ListTabsSmallComponent,
	'list-tabs-dropdown': ListTabsDropdownComponent,
	'list-tabs-radio-icon':ListTabsRadioIconComponent,
	'list-tabs-slider': ListTabsSliderComponent,
	'list-tabs-collapse': ListTabsCollapse,
	'list-tabs-multi-select' : ListMultiTabs,
	'list-tabs-read-content' : ListTabsReadContent,
	'list-collapsible' : ListCollapsible,
	'collapsible-item' : ListCollapsibleItem,

	'data-grid' : DataGridComponent,

	//'chart' : ChartComponent,

	'clone': CloneComponent,

	'content': ContentComponent,
	'content-text': ContentTextComponent,
	'content-text-list': ContentTextListComponent,
	'content-markdown': ContentMarkdownComponent,
	'content-list': ContentList,
	'content-tooltip': ContentComponent,
	'content-calculator': ContentCalculatorComponent,
	'content-grid' : ContentGridComponent,
	'link': ContentLink,
	'content-iframe': ContentIFrame,

	'custom-group' : CustomGroupElementsComponent,
	'custom-multi-group' : CustomMultiGroupElementsComponent,
	'custom-formula-calculator' : CustomFormulaCalculator,
	'custom-calculator-animate' : CustomCalculatorAnimate,
	'text-calculator' :  CustomFormulaCalculatorText,
	'custom-ratio-bar' : CustomRatioBarComponent,
	/*'custom-search-select' : CustomSearchSelect,*/
	/*'custom-carousel' : CustomCarouselWrapper,*/
	'custom-external-links' : CustomExternalLinks,
	'custom-state-suggestion' : CustomStateSuggestionComponent,
	'custom-country-suggestion' : CustomCountrySuggestionComponent,

	'popup': PopupComponent,

	'table' : TableComponent,
	'table-header' : TableHeaderComponent,
	'table-body' : TableBodyComponent,
	'table-footer' : TableFooterComponent,
	'table-row' : TableRowComponent,

	//'profile-pic' : ProfilePicComponent
};

export default DefaultComponentIndex;
