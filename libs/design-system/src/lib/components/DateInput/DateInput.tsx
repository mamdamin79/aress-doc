import moment from 'moment';
import { cn } from '../../../utils';
import { useEffect, useRef, useState } from 'react';
import { CustomDate } from './DateInput.types';

interface Props {
    defaultValue: string | Date | CustomDate;
    onChange: (value: string | Date) => void;
    mode: 'jalali' | 'miladi';
    min?: string;
    errors: {
        minError: boolean,
        maxError: boolean,
        validError: boolean,
    },
    max?: string;
    errorHandler: (e: {
        minError: boolean,
        maxError: boolean,
        validError: boolean,
    }) => void
}

const isCustomDate = (value: unknown): value is CustomDate => {
    return (
        typeof value === 'object' &&
        value !== null &&
        'day' in value &&
        'month' in value &&
        'year' in value &&
        typeof (value as CustomDate).day === 'number' &&
        typeof (value as CustomDate).month === 'number' &&
        typeof (value as CustomDate).year === 'number'
    );
};
export const DateInput: React.FC<Props> = ({
    defaultValue,
    errorHandler,
    errors,
    onChange,
    mode,
    min,
    max,
}) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(1);
    const [day, setDay] = useState<number>(0);
    const [month, setMonth] = useState<number | null>();
    const [year, setYear] = useState<number | null>();

    const [minDate, setMinDate] = useState({
        day,
        month,
        year,
    });
    const [maxDate, setMaxDate] = useState({
        day,
        month,
        year,
    });

    const [yearError, setYearError] = useState<boolean>(false);
    const [dayError, setDayError] = useState<boolean>(false);
    const [monthError, setMonthError] = useState<boolean>(false);
    const dayRef = useRef<HTMLInputElement | null>(null);
    const monthRef = useRef<HTMLInputElement | null>(null);
    const yearRef = useRef<HTMLInputElement | null>(null);
    const [isArrowKeyPressed, setIsArrowKeyPressed] = useState(false);

    const isMiladi = (date: string) => moment(date, 'YYYY-MM-DD', true);
    const isShamsi = (date: string) => moment(date, 'jYYYY/jM/jD');

    useEffect(() => {
        if (defaultValue instanceof Date) {
            const regex = /^(?:[1-9]|[12][0-9]|3[01])?$/;
            if (regex.test(String(defaultValue.getDate()))) {
                setDay(defaultValue.getDate());
                setMonth(+defaultValue.getMonth() + 1);
                setYear(+defaultValue.getFullYear());
                setActiveIndex(null);
            }
        } else if (isCustomDate(defaultValue)) {
            setDay(defaultValue.day);
            setMonth(defaultValue.month);
            setYear(defaultValue.year);
            setActiveIndex(null);
        } else if (typeof defaultValue === 'string') {
            if (mode === 'miladi' && isMiladi(defaultValue).isValid()) {
                const dateMiladi = isMiladi(defaultValue);
                setDay(dateMiladi.date());
                setMonth(dateMiladi.month());
                setYear(dateMiladi.year());
            }
            if (mode === 'jalali' && isShamsi(defaultValue).isValid()) {
                const dateJalali = isShamsi(defaultValue);
                if (dateJalali.month() > 6 && dateJalali.date() === 31) {
                    setDay(31);
                    setMonth(dateJalali.month());
                    setYear(dateJalali.year());
                } else {
                    setDay(dateJalali.date());
                    setMonth(dateJalali.month());
                    setYear(dateJalali.year());
                }
            }
        }
    }, [mode, defaultValue]);

    useEffect(() => {
        if (!day) {
            dayRef?.current?.focus();
        }
    }, [day]);

    useEffect(() => {
        if (min && mode === 'miladi') {
            if (isMiladi(min).isValid()) {
                setMinDate({
                    day: isMiladi(min).date(),
                    month: isMiladi(min).month(),
                    year: isMiladi(min).year(),
                });
            }
        }
        if (min && mode === 'jalali') {
            if (isShamsi(min).isValid()) {
                if (isShamsi(min).month() + 1 > 6) {
                    if (isShamsi(min).date() > 31) {
                        setMinDate({
                            day: 31,
                            month: isShamsi(min).month(),
                            year: isShamsi(min).year(),
                        });
                    } else
                        setMinDate({
                            day: isShamsi(min).date(),
                            month: isShamsi(min).month(),
                            year: isShamsi(min).year(),
                        });
                }
                setMinDate({
                    day: isMiladi(min).date(),
                    month: isMiladi(min).month(),
                    year: isMiladi(min).year(),
                });
            }
        }
    }, [min, mode]);

    useEffect(() => {
        if (max) {
            const miladiDate = isMiladi(max);
            if (miladiDate.isValid()) {
                setMaxDate({
                    day: miladiDate.date(),
                    month: miladiDate.month(),
                    year: miladiDate.year(),
                });
            }
            if (mode === 'jalali') {
                const shamsiDate = isShamsi(max);
                if (shamsiDate.isValid()) {
                    if (shamsiDate.month() + 1 > 6) {
                        if (shamsiDate.date() > 31) {
                            setMaxDate({
                                day: 31,
                                month: shamsiDate.month(),
                                year: shamsiDate.year(),
                            });
                        } else
                            setMaxDate({
                                day: shamsiDate.date(),
                                month: shamsiDate.month(),
                                year: shamsiDate.year(),
                            });
                    }
                    setMaxDate({
                        day: shamsiDate.date(),
                        month: shamsiDate.month(),
                        year: shamsiDate.year(),
                    });
                }
            }
        }
    }, [max, mode]);

    const changeMonthInput = (e: number, mode?: string) => {
        const regex = /^(0?[1-9]|1[0-2])?$/;

        if (regex.test(String(e))) {
            setMonth(e);
        }

        if (
            minDate.year ||
            minDate.day ||
            minDate.month ||
            maxDate.day ||
            maxDate.month ||
            maxDate.year
        ) {





            if (String(e).length === 2) {
                if (
                    (year === minDate.year &&
                        minDate.month &&
                        e === minDate.month + 1 &&
                        day &&
                        minDate.day &&
                        day <= minDate.day) ||
                    (year === maxDate.year &&
                        maxDate.month &&
                        e === maxDate.month + 1 &&
                        day &&
                        maxDate.day &&
                        day >= maxDate.day)
                ) {
                    setDayError(true);
                } else {
                    if (
                        (year === minDate.year && minDate.month && e < minDate.month + 1) ||
                        (year === maxDate.year && maxDate.month && e > maxDate.month + 1)
                    ) {
                        setMonthError(true);
                    } else {
                        setMonthError(false);
                        if (mode === 'changeNumber') {
                            if (!day) {
                                setActiveIndex(1);
                                dayRef.current?.focus();
                            } else if (!year) {
                                setActiveIndex(3);
                                yearRef.current?.focus();
                            } else setActiveIndex(null);
                        }
                    }
                }
            } else {
                if (
                    (year === minDate.year &&
                        minDate.month &&
                        e === minDate.month + 1 &&
                        day &&
                        minDate.day &&
                        day <= minDate.day) ||
                    (year === maxDate.year &&
                        maxDate.month &&
                        e === maxDate.month + 1 &&
                        day &&
                        maxDate.day &&
                        day >= maxDate.day)
                ) {
                    setDayError(true);
                } else if (
                    (year === minDate.year && minDate.month && e < minDate.month + 1) ||
                    (year === maxDate.year && maxDate.month && e > maxDate.month + 1)
                ) {
                    setMonthError(true);
                } else {
                    setDayError(false);
                    setMonthError(false);
                }
            }




        } else {
            if (String(e).length === 2) {
                setMonthError(false);
                if (mode === 'changeNumber') {
                    if (!day) {
                        setActiveIndex(1);
                        dayRef.current?.focus();
                    } else if (!year) {
                        setActiveIndex(3);
                        yearRef.current?.focus();
                    } else setActiveIndex(null);
                }
            }
        }

        if (!e) {
            setMonth(null);
        }

        if (mode === 'jalali') {
            if (
                year &&
                String(year).length === 4 &&
                e === 12 &&
                !moment([year]).isLeapYear() &&
                day &&
                day > 30
            )
                setDay(30);
            if (
                year &&
                String(year).length === 4 &&
                e === 12 &&
                moment([year]).isLeapYear() &&
                day &&
                day > 29
            )
                setDay(29);
            if (e > 6 && e < 12 && day === 31 && mode) setDay(30);
        }

        if (mode === 'miladi') {
            if (
                String(year).length === 4 &&
                year &&
                moment([year]).isLeapYear() &&
                e === 2 &&
                day &&
                day > 28
            ) {
                setDay(29);
            } else if (
                String(year).length === 4 &&
                year &&
                !moment([year]).isLeapYear() &&
                e === 2 &&
                day &&
                day > 28
            ) {
                setDay(28);
            }
            if ((e === 6 || e === 11 || e === 4 || e === 9) && day === 31) setDay(30);
        }
    };

    const changeDayInput = (e: number, arrowChange?: boolean) => {
        const regex = /^(?:[1-9]|[12][0-9]|3[01])?$/;

        if (regex.test(String(e))) {
            setDay(e);
        }

        if (minDate.year && minDate.month && minDate.day) {
            if (year === minDate.year && month === minDate.month + 1 && e < minDate.day) {
                errorHandler({ minError: true, maxError: false, validError: false });
                setDayError(true);
            } else {
                errorHandler({ minError: false, maxError: false, validError: false });
                setDayError(false);
            }
        }
        if (maxDate.year && maxDate.month && maxDate.day) {
            if (year === maxDate.year && month === maxDate.month + 1 && e > maxDate.day) {
                errorHandler({ minError: false, maxError: true, validError: false });
                setDayError(true);
            } else {
                errorHandler({ minError: false, maxError: false, validError: false });
                setDayError(false);
            }
        }
        
        if (mode === 'jalali') {
            if (month && month > 6 && e === 31) setDay(30);
            if (month && month > 6 && month <= 8 && e === 31) setDay(30);
            if (regex.test(String(e)) && day !== 31) {
                setDay(e);
            }
        }
        if (mode === 'miladi') {
            if (
                String(year).length === 4 &&
                month &&
                year &&
                month === 2 &&
                moment([year]).isLeapYear() &&
                /^(?:[1-9]|1[0-9]|2[0-9])?$/.test(String(e))
            )
                setDay(e);
            if (
                String(year).length === 4 &&
                month &&
                year &&
                month === 2 &&
                !moment([year]).isLeapYear() &&
                /^(?:[1-9]|1[0-9]|2[0-8])?$/.test(String(e))
            )
                setDay(e);
            if (
                String(year).length === 4 &&
                ((month && month === 6) ||
                    month === 11 ||
                    month === 4 ||
                    month === 9) &&
                e === 31
            )
                setDay(30);
        }
        if (String(e).length === 2 && !arrowChange) {
            if (!month) {
                setActiveIndex(2);
                monthRef.current?.focus();
            } else if (!year) {
                setActiveIndex(3);
                yearRef.current?.focus();
            }
        }


        if (!e) {
            setDay(0);
        }
        if (
            (e === 31 || (e && isCustomDate(e) && e.day === 31)) &&
            month &&
            month > 6
        ) setDay(30);
    };


    const changeYearInput = (e: number, mode?: string) => {
        if (/^\d{0,4}$/.test(String(e))) {
            setYear(e);
        }

        if (
            minDate.year ||
            minDate.day ||
            minDate.month ||
            maxDate.day ||
            maxDate.month ||
            maxDate.year
        ) {
            if (String(e).length === 4) {
                if (
                    (minDate.year === e &&
                        minDate.month &&
                        month &&
                        month === minDate.month + 1 &&
                        day &&
                        minDate.day &&
                        day <= minDate.day) ||
                    (maxDate.year === e &&
                        maxDate.month &&
                        month &&
                        month === maxDate.month + 1 &&
                        day &&
                        maxDate.day &&
                        day >= maxDate.day)
                ) {
                    setDayError(true);
                } else {
                    setDayError(false);
                }

                if (
                    (e === maxDate.year &&
                        day &&
                        month &&
                        maxDate.month &&
                        month > maxDate.month + 1) ||
                    (e === minDate.year &&
                        day &&
                        month &&
                        minDate.month &&
                        month < minDate.month + 1)
                ) {
                    setMonthError(true);
                } else {
                    setMonthError(false);
                }
                if (
                    (minDate.year && e < minDate.year) ||
                    (maxDate.year && e > maxDate.year)
                ) {
                    setYearError(true);
                } else {
                    setYearError(false);
                    if (mode === 'changeNumber') {
                        if (!day) {
                            setActiveIndex(1);
                            dayRef.current?.focus();
                        } else if (!month) {
                            setActiveIndex(2);
                            monthRef.current?.focus();
                        } else setActiveIndex(null);
                    }
                }
            } else {
                setYearError(true);
                errorHandler({ minError: false, maxError: false, validError: true });
            }
        } else {
            if (String(e).length === 4) {
                setYearError(false);
                if (mode === 'changeNumber') {
                    if (!month) {
                        setActiveIndex(1);
                        monthRef.current?.focus();
                    } else if (!day) {
                        setActiveIndex(2);
                        dayRef.current?.focus();
                    } else setActiveIndex(null);
                }
            } else {
                setYearError(true);
                errorHandler({ minError: false, maxError: false, validError: true })
            }
        }

        if (String(e).length === 4) {
            if (
                (minDate.year && e < minDate.year) ||
                (maxDate.year && e > maxDate.year)
            ) {
                setYearError(true);
            } else {
                setYearError(false);
                if (mode === 'changeNumber') {
                    if (!month) {
                        setActiveIndex(2);
                        monthRef.current?.focus();
                    } else if (!day) {
                        dayRef.current?.focus();
                        setActiveIndex(1);
                    } else setActiveIndex(null);
                }
            }
        } else setYearError(true);

        if (!e) {
            setYear(null);
        }

        if (mode === 'miladi') {
            if (
                String(e).length === 4 &&
                ((month && month === 6) ||
                    month === 11 ||
                    month === 4 ||
                    month === 9) &&
                day === 31
            ) {
                setDay(30);
            }
            if (
                String(e).length === 4 &&
                moment([e]).isLeapYear() &&
                month &&
                month === 2 &&
                day &&
                day > 28
            ) {
                setDay(29);
            } else if (
                String(e).length === 4 &&
                !moment([e]).isLeapYear() &&
                month &&
                month === 2 &&
                day &&
                day > 28
            ) {
                setDay(28);
            }
        }

        if (mode === 'jalali') {
            if (String(e).length === 4 && day === 31 && month && month > 6)
                setDay(30);
            if (
                String(e).length === 4 &&
                year &&
                !moment([year]).isLeapYear() &&
                month &&
                month === 12 &&
                day === 31
            )
                setDay(30);
            if (
                String(e).length === 4 &&
                year &&
                moment([year]).isLeapYear() &&
                month &&
                month === 12 &&
                (day === 31 || day === 30)
            )
                setDay(29);
        }
    };

    const formatDay = (day: number | null | undefined) => {
        if (!day) return '';
        return String(day).length === 1 ? `0${day}` : day;
    };

    const formatMonth = (month: number | null | undefined) => {
        if (!month) return '';
        return String(month).length === 1 ? `0${month}` : month;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const keydownHandler = (e: KeyboardEvent) => {
        if (activeIndex) {
            if (e.key === 'ArrowLeft') {
                setIsArrowKeyPressed(false);
                if (activeIndex === 1) {
                    setActiveIndex(2);
                    monthRef?.current?.focus();
                    dayRef?.current?.blur();
                }
                if (activeIndex === 2) {
                    setActiveIndex(3);
                    yearRef?.current?.focus();
                    monthRef?.current?.blur();
                }
            }
            if (e.key === 'ArrowRight') {
                setIsArrowKeyPressed(false);
                if (activeIndex === 2) {
                    dayRef?.current?.focus();
                    monthRef?.current?.blur();
                }
                if (activeIndex === 3) {
                    monthRef?.current?.focus();
                    yearRef?.current?.blur();
                }
                if (activeIndex === 2) {
                    monthRef?.current?.blur();
                    dayRef?.current?.focus();
                }
                if (activeIndex > 1) {
                    setActiveIndex(activeIndex - 1);
                }
            }
            if (e.key === 'ArrowUp') {
                // year change
                if (activeIndex === 3) {
                    changeYearInput(year ? year + 1 : 1);
                }
                // // // month change
                if (activeIndex === 2) {
                    changeMonthInput(
                        month ? (month >= 1 && month < 12 ? month + 1 : month) : 1
                    );
                }

                // // change day
                if (activeIndex === 1) {
                    changeDayInput(day + 1);
                }
                setIsArrowKeyPressed(false);
            }
            if (e.key === 'ArrowDown') {
                if (activeIndex === 1) {
                    changeDayInput(day ? (day >= 1 && day <= 31 ? day - 1 : 2) : 0);
                    setIsArrowKeyPressed(false);
                }
                if (activeIndex === 3) {
                    changeYearInput(year ? year - 1 : 0)
                    setIsArrowKeyPressed(false);
                }
                if (activeIndex === 2) {
                    changeMonthInput(month ? (month >= 1 && month <= 12 ? month - 1 : 0) : 0);
                    setIsArrowKeyPressed(false);
                }
            }
        }
    };

    useEffect(() => {
        if (isArrowKeyPressed) {
            return;
        }
        window.addEventListener('keydown', keydownHandler);

        return () => window.removeEventListener('keydown', keydownHandler);
    }, [isArrowKeyPressed, activeIndex, day, month, year, keydownHandler]);


    return (
        <div>
            <div
                className={cn(
                    'w-40 rounded-md border-2 flex items-center gap-1 border-brand-600 py-2 px-4',
                    { 'border-red-600': dayError || monthError || yearError }
                )}
            >
                <input
                    dir="rtl"
                    onClick={() => {
                        setActiveIndex(1);
                        dayRef?.current?.setSelectionRange(dayRef?.current?.value.length, dayRef?.current?.value.length);
                    }}
                    ref={dayRef}
                    value={formatDay(day)}
                    onChange={(e) => changeDayInput(+e.target.value, false)}
                    type="text"
                    placeholder="روز"
                    className={cn(
                        'w-5 outline-none pb-0.5 placeholder:text-black block',
                        activeIndex === 1 && 'bg-blue-200'
                    )}
                />
                /
                <input
                    dir="rtl"
                    onClick={() => {
                        setActiveIndex(2)
                        monthRef?.current?.setSelectionRange(monthRef?.current?.value.length, monthRef?.current?.value.length);
                    }
                    }
                    ref={monthRef}
                    value={formatMonth(month)}
                    onChange={(e) => changeMonthInput(+e.target.value, 'changeNumber')}
                    type="text"
                    placeholder="ماه"
                    className={cn(
                        'w-5 outline-none pb-0.5 placeholder:text-black block',
                        activeIndex === 2 && 'bg-blue-200'
                    )}
                />
                /
                <input
                    dir="rtl"
                    onClick={() => {
                        setActiveIndex(3)
                        yearRef?.current?.setSelectionRange(yearRef?.current?.value.length, yearRef?.current?.value.length);
                    }
                    } ref={yearRef}
                    value={year ?? ''}
                    onChange={(e) => changeYearInput(+e.target.value, 'changeNumber')}
                    type="text"
                    placeholder="سال"
                    className={cn(
                        'min-w-2 outline-none pb-0.5 placeholder:text-black block',
                        activeIndex === 3 && 'bg-blue-200'
                    )}
                />
            </div>
            <span>
                {
                    errors?.validError && 'سال وارد شده معتبر نمیباشد'
                }
                                {
                    errors?.minError && 'سال وارد شده کوچیک تر از محدوده ورودی است. '
                }
                                                {
                    errors?.maxError && 'سال وارد شده بزرگ تر از محدوده ورودی است. '
                }
            </span>
        </div>
    );
};
