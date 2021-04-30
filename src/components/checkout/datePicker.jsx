import React, { useContext, useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { French } from "flatpickr/dist/l10n/fr.js";
import { English } from "flatpickr/dist/l10n/de.js";
import { multilanguage } from "redux-multilanguage";
import { getDateFrom, isDefined, isDefinedAndNotVoid, isPastHour, isSameDate } from '../../helpers/utils';
import AuthContext from '../../contexts/AuthContext';
import DayOffActions from '../../services/DayOffActions';
import { getWeekDays } from '../../helpers/days';

const DatePicker = ({date, setDate, condition, strings}) => {

    const { settings } = useContext(AuthContext);
    const [daysOff, setDaysOff] = useState([]);
    const [minDate, setMinDate] = useState(new Date());
    const [weekConstraints, setWeekConstraints] = useState([])

    useEffect(() => {
        DayOffActions.findActives()
                     .then(closedDays => {
                         if (!isDefined(settings.value)) {
                             setDaysOff(closedDays)
                         } else {
                             const applicableDays = closedDays.filter(day => {
                                 return day.openedFor.find(group => group.value === settings.value) === undefined;
                             });
                             setDaysOff(applicableDays);
                        }
                    });

    }, []);

    useEffect(() => setWeekConstraints(getWeekConstraints()), [condition]);

    useEffect(() => {
        if (isDefined(settings.dayInterval) && isDefinedAndNotVoid(daysOff)) {
            const minDate = getFirstOpenDay();
            setDate(minDate);
            setMinDate(minDate);
        }
    }, [settings, daysOff]);

    const onDateChange = datetime => {
        const newSelection = new Date(datetime[0].getFullYear(), datetime[0].getMonth(), datetime[0].getDate(), 9, 0, 0);
        setDate(newSelection);
    };

    const isOffDay = date => daysOff.find(day => isSameDate(new Date(day.date), date)) !== undefined || weekConstraints.includes(date.getDay());        //  === 0

    const getFirstOpenDay = () => {
        let i = 0;
        const start = isDefined(settings.hourLimit) && isPastHour(settings.hourLimit) ? getDateFrom(new Date(), 1) : new Date();
        let openDay = getDateFrom(start, settings.dayInterval);
        while (isOffDay(openDay)) {
            i++;
            openDay = getDateFrom(start, settings.dayInterval + i);
        }
        return openDay;
    };

    const getWeekConstraints = () => {
        const weekDays = getWeekDays();
        const deliveredDays = isDefined(condition) ? condition.days : weekDays.filter(day => day.value !== 0);
        const constraints = weekDays.filter(day => {
            return deliveredDays.find(openDay => openDay.value ===day.value) === undefined;
        });
        return constraints.map(day => day.value);
    }

    return (
        <>
            <h3>{strings["delivery_date"]}</h3>
            <div className="row">
                <div className="col-md-12 row-date mb-5">
                    <Flatpickr
                        name="date"
                        value={ date }
                        onChange={ onDateChange }
                        className="form-control form-control-sm"
                        options={{
                            dateFormat: "d/m/Y",
                            minDate: minDate,
                            locale: French,
                            disable: [(date) => isOffDay(date)],
                        }}
                    />
                </div>
            </div>
        </>
    );
}
 
export default multilanguage(DatePicker);