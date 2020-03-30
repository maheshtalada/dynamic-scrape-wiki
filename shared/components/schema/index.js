import loadable from '@loadable/component';

export const Schema = loadable(() => import(/* webpackChunkName: "Schema" */ 'components/schema/schema.js'),{
	LoadingComponent: <div>Loading...</div>,
});
export DropdownComponent from './components/options/dropdown';
export TextComponent from './components/text/text';
export TextCurrencyComponent from './components/text/text-currency';
export TextareaComponent from './components/text/textarea';
export Radio from './components/options/radio';
export Header from './components/header/header';
export ContentGrid from './components/content/content-grid';
export Table from './components/table/table';
export TableBody from './components/table/table-body';
export TableHeader from './components/table/table-header';
export TableRow from './components/table/table-row';
