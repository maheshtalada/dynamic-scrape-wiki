import loadable from '@loadable/component';
import Spinner from '../../../components/common/spinner/spinner';

export const Details = loadable(() => import(/* webpackChunkName: 'PropertyDetails' */'./details'),{
	LoadingComponent: Spinner,
});
export const IncomeAndExpense = loadable(() => import(/* webpackChunkName: 'PropertyIncomeAndExpense' */'./incomeandexpense'),{
	LoadingComponent: Spinner,
});
export const PurchaseDetails = loadable(() => import(/* webpackChunkName: 'PropertyPurchaseDetails' */'./purchase-details'),{
	LoadingComponent: Spinner,
});
export const Review = loadable(() => import(/* webpackChunkName: 'PropertyReview' */'./review'),{
	LoadingComponent: Spinner,
});



