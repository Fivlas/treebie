import {StyleSheet, View, Text} from 'react-native';

export type TitleHeaderOptions = {
    children: string;
};

export function TitleHeader({children, ...rest}: Readonly<TitleHeaderOptions>) {
    return (<View style={styles.container}><Text style={styles.headerText} className={"text-secondary"} {...rest} >{children}</Text></View>);
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
    headerText: {
        fontSize: 44,
        lineHeight: 42,
        fontWeight: "bold",
        width: "100%",
        overflow: 'hidden',
        textAlign: "center"
    }
});