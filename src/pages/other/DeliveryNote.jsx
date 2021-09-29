import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { isDefined, isDefinedAndNotVoid } from '../../helpers/utils';
import DeliveryTable from '../../components/deliveryNotes/deliveryTable';
import DeliveryInformations from '../../components/deliveryNotes/deliveryInformations';
import OrderActions from '../../services/OrderActions';

const styles = StyleSheet.create({
    viewer: {
        height: '100vh',
        width: '100vw'
    },
    document: {
        height: '100vh',
        width: '100vw'
    },
    page: {
      backgroundColor: '#E4E4E4',
      width: 100,
      height: 100
    },
    header: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 15
    },
    society: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        width: 100,
        height: 100,
        textAlign: 'left'
    },
    client: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        width: 100,
        height: 100,
        textAlign: 'right'
    },
    orderNumber: {
        marginLeft: 10,
        marginTop: 30,
        paddingLeft: 10,
        textAlign: 'left'
    },
    date: {
        marginLeft: 10,
        marginTop: 10,
        paddingLeft: 10,
        textAlign: 'left'
    },
    text: {
        marginLeft: 12,
        marginBottom: 6,
        fontSize: 11,
    },
    h3: {
        marginLeft: 12,
        marginBottom: 6,
        fontSize: 13,
        fontWeight: 'extrabold'
    },
    small: {
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 6,
        fontSize: 8,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 10,
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: 'left',
        // color: 'grey'
    }
});

const DeliveryNote = ({ match }) => {

    const { id = "new" } = match.params;
    const maxPerPage = 15;
    const [order, setOrder] = useState(null);

    useEffect(() => {
        if (id !== "new")
            fetchOrder(id);
    }, []);
    
    const fetchOrder = id => {
        OrderActions
            .find(id)
            .then(response => setOrder(response))
            .catch(error => console.log(error));
    };

    return !isDefined(order) ? <></> : (
        <PDFViewer id="deliveryViewer" style={ styles.viewer }>
            <Document style={ styles.viewer }>
                <DeliveryInformations order={ order } ordersLength={ order.items.length } maxPerPage={ maxPerPage } packagesLength={ isDefined(order.packages) ? order.packages.length : 0 }/> 
            </Document>
        </PDFViewer>
    );
}

export default DeliveryNote;