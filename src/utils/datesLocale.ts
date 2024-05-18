import moment from 'moment';
// import 'moment/locale/es';
// import 'moment/locale/en';

export const getLocaleData = (date: string) => {
    moment.locale('en');
    // moment.locale('es');
    // moment(bloodTest.date).format('LLLL')
    return moment(date).format('LLLL');
}