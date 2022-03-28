import React from 'react';
import DeliveryTable from './deliveryTable';
import { Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { isDefined, isDefinedAndNotVoid } from '../../helpers/utils';

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
      position: 'absolute',
      width: 100,
      height: 100
    },
    background: {
        position: 'relative',
        top: 180,
        zIndex: -20,
        opacity: 0.2
    },
    body: {
        position: 'absolute',
        top: 0,
        margin: 'auto'
    },
    header: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 15
    },
    society: {
        marginLeft: 10,
        paddingLeft: 10,
        flexGrow: 1,
        width: 150,
        height: 150,
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column'
    },
    societyAddress: {
        marginTop: 0,
        flexGrow: 1,
        textAlign: 'left',
    },
    client: {
        margin: 10,
        marginRight: 80,
        padding: 10,
        flexGrow: 1,
        width: 90,
        height: 100,
        textAlign: 'right'
    },
    pageNumber: {
        textAlign: 'right',
        fontSize: 8,
        marginRight: 90,
        marginLeft: 'auto'
    },
    pageText: {
        marginLeft: 12,
        marginBottom: 6,
        fontSize: 9,
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
        textAlign: 'center'
    },
    footer: {
        position: 'absolute',
        fontSize: 10,
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: 'left'
    }
});

const DeliveryInformations = ({order, ordersLength, maxPerPage, packagesLength = 0, platform = null }) => {

    const totalPages = Math.ceil((ordersLength + packagesLength) / maxPerPage);
    const pages = [...Array(totalPages).keys()];
    const invoicedElements = packagesLength === 0 ? 
        [...order.items.map(i => ({...i, isPackage: false}))] : 
        [...order.items.map(i => ({...i, isPackage: false})), ...order.packages.map(p => ({...p, isPackage: true}))];

    const getPlatformAddress = () => {
        if (isDefined(platform) && isDefined(platform.metas)) {
            const address = platform.metas.address;
            return isDefined(address) && address.length > 0 ? (address.split(','))[0] :  "";
        }
        return "";
    };

    const getPlatformCity = () => {
        if (isDefined(platform) && isDefined(platform.metas)) {
            const zipcode = platform.metas.zipcode;
            const city = platform.metas.city;
            return isDefined(zipcode) && isDefined(city) ? `${zipcode} - ${city}` : "";
        }
        return "";
    };

    const getPlatformSiret = () => {
        return isDefined(platform) && isDefined(platform.siret) ? `N° SIRET : ${platform.siret}` : "";
    };

    return !isDefined(platform) ? <></> : (
        pages.map((page, i) => {

            const itemsToDisplay = invoicedElements.slice((i * maxPerPage), ((i + 1) * maxPerPage));
            const orderPages = Math.ceil(itemsToDisplay.length / maxPerPage);

            return !isDefinedAndNotVoid(itemsToDisplay) ? <></> : (
                <Page size="A4" style={ styles.page }>
                    { isDefined(platform) && isDefinedAndNotVoid(platform.logos) && isDefined(platform.logos.find(l => l.type === "LOGO_FULL_DARK")) && 
                        <Image 
                            src={ (platform.logos.find(l => l.type === "LOGO_FULL_DARK")).image.imgPath }
                            style={styles.background}
                            loading="lazy"
                            alt=""
                        />
                    }
                    <View style={ styles.body }>
                        <View style={styles.header}>
                                <View style={ styles.society }>
                                    { isDefined(platform) && isDefinedAndNotVoid(platform.logos) && isDefined(platform.logos.find(l => l.type === "LOGO_STRETCHED_DARK")) && 
                                        <Image 
                                            src={ (platform.logos.find(l => l.type === "LOGO_STRETCHED_DARK")).image.imgPath }
                                            style={{ width: '120px', marginLeft: 5, marginTop: -10, marginBottom: 10}}
                                            loading="lazy"
                                            alt=""
                                        />
                                    }
                                    <View >
                                        <Text style={styles.text}>{ getPlatformAddress() }</Text>
                                        <Text style={styles.text}>{ getPlatformCity() }</Text>
                                        <Text style={styles.small}>{ getPlatformSiret() }</Text>
                                    </View>
                                </View>
                            <View style={ styles.client }>
                                <Text style={{...styles.h3, marginBottom: 16, fontSize: 15}}>{ order.name }</Text>
                                <Text style={styles.text}>{ order.metas.address }</Text>
                                <Text style={styles.text}>{ order.metas.address2 }</Text>
                                <Text style={styles.text}>{ "Tel : " + order.metas.phone }</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%' }}>
                            <Text style={styles.title}>BON DE LIVRAISON</Text>
                        </View>
                        <View style={ styles.orderNumber }>
                            <Text style={styles.h3}>{"Commande N°" + order.id.toString().padStart(10, '0') }</Text>
                        </View>
                        <View style={ styles.date }>
                            <Text style={styles.text}>{"Le " + new Date(order.deliveryDate).toLocaleDateString() + ',' }</Text>
                        </View>
                        <View style={ styles.pageNumber }>
                            <Text style={styles.pageText}>Page { i + 1 } sur { orderPages }</Text>
                        </View>

                        <DeliveryTable order={ order } items={ itemsToDisplay }/>
                    </View>
                        <View style={ styles.footer }>
                            <Text style={styles.small}>
                                En cas de retard de paiement, une pénalité égale à 3 fois le taux d'intérêt légal sera exigible (Décret 2009-138 du 9 février 2009), ainsi qu'une indémnité forfaitaire pour frais de
                                recouvrement d'un montant minimum de 40 euros pour les professionnels (Décret 2012-1115 du 9 octobre 2012).
                            </Text>
                        </View>
                </Page>
            )
        })
    );
}
 
export default DeliveryInformations;