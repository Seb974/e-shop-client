import React, { useContext, useEffect } from 'react';
import Flatpickr from 'react-flatpickr';
import { French } from "flatpickr/dist/l10n/fr.js";
import { English } from "flatpickr/dist/l10n/de.js";
import { multilanguage } from "redux-multilanguage";
import { getDateFrom, isDefined } from '../../helpers/utils';
import AuthContext from '../../contexts/AuthContext';
import DayOffActions from '../../services/DayOffActions';

const today = getDateFrom(new Date(), 0);
const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 9, 0, 0);

const DatePicker = ({date, setDate, strings}) => {

    const { country, settings } = useContext(AuthContext);

    useEffect(() => {
        DayOffActions.findAll()
                     .then(response => setDaysOff(response));
    })
    useEffect(() => {
        if (isDefined(settings.dayInterval)) {
            const minDate = getDateFrom(today, (isDefined(settings.dayInterval) ? settings.dayInterval : 0));
            setDate(minDate);
        }
    }, [settings]);



    const onDateChange = datetime => {
        const newSelection = new Date(datetime[0].getFullYear(), datetime[0].getMonth(), datetime[0].getDate(), 9, 0, 0);
        setDate(newSelection);
    };

    return (
        <>
            <h3>{strings["delivery_date"]}</h3>
            <div className="row">
                <div className="col-md-12 row-date mb-5">
                {/* <label htmlFor="date" className="date-label">Date de livraison</label> */}
                <Flatpickr
                    name="date"
                    value={ date }
                    onChange={ onDateChange }
                    className="form-control form-control-sm"
                    options={{
                        dateFormat: "d/m/Y",
                        minDate: today.getDay() !== 0 ? today : tomorrow,
                        locale: French,
                        disable: [(date) => date.getDay() === 0],
                    }}
                />
                </div>
            </div>
        </>
    );
}
 
export default multilanguage(DatePicker);