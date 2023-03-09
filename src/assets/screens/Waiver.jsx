import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

const Waiver = () => {

    return (
        <View>
            <Text style={styles.Header}>TLV-Hoops PARTICIPATION WAIVER </Text>
            <Text> TLV-HOOPS PARTICIPATION WAIVER
                In consideration of the services provided by Indoor Hoops Inc. and being allowed to participate (in any way) in any game or event affiliated with Indoor Hoops, I understand, acknowledge and agree to the following:

                Certify that I am physically fit and able to participate in the program, event or activity, and have not been advised otherwise by a qualified medical professional
                I will be engaging in activities that involve risk of serious injury, including permanent paralysis and death, and severe social and economic losses which might result not only from my own action, inactions or negligence, but the actions or inactions or negligence of others (including Indoor Hoops), the rules of play, or the condition the premises or any equipment used. In addition, there may be other risks not known to us or not reasonably foreseeable at this time. I UNDERSTAND AND ASSUME ALL SUCH RISKS.
                Prior to my participation in any game or event affiliated with Indoor Hoops in any way, I will inspect the facilities and equipment being used, and if I believe they may be unsafe, I will immediately notify Indoor Hoops personnel of such condition and will refuse to participate until the issue is remedied.
                I, for myself and on behalf of my heirs, assigns, personal representatives and next of kin, hereby release, waive, discharge and covenant not to sue Indoor Hoops Inc., their respective affiliated entities and organizations, and their respective directors, commissioners, referees, employees, agents, facilities, and sponsors (the "Representatives") from any and all claims, demands, losses or damages on account of injury, including death or damage to property, caused or alleged to be caused in whole or part by the negligence of Indoor Hoops or the Representatives.
                Agree to indemnify, defend and hold the Releasees harmless from and against any and all claims for damages, injuries, losses, liabilities and expenses relating to, resulting from or arising out of my participation in any Indoor Hoops activity.
                Consent to have medical treatment that may be deemed advisable in the event of injury, accident and/or illness during any program, event or activity. I release CPLSL and all persons participating in any such medical treatment from all responsibility for any such actions.
                Intend that this Waiver and Release of Liability shall be construed broadly to provide a release and waiver to the maximum extent permissible under applicable law.
                BY SELECTING THE CHECKBOX I AGREE TO THE TERMS & CONDITIONS OF THIS PARTICIPATION WAIVER. </Text>

        </View>
    )

}

const styles = StyleSheet.create({
    Header: {
        marginVertical: 15,
        flex: 1,
        fontSize: 22,
        textAlign: "center",
        fontWeight: "bold",
        color: "#3A98B9",
    }
})

export default Waiver