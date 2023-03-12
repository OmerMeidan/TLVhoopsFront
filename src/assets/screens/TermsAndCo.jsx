import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const TermsAndCo = () => {

    return (
        <ScrollView>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", justifyContent: 'center', backgroundColor: "#3A98B9" }}>
                <Text style={styles.Header}>TERMS & CONDITIONS</Text>
                <Text style={styles.aboutText}> TLV-Hoops Application Terms and Conditions

                    These terms and conditions ("Terms") apply to the use of the TLV-Hoops application ("App"). By using the App, you agree to these Terms.

                    Purpose of the App
                    The App is designed to connect basketball players with each other by enabling users to post games and allowing other users to register for those games. The App allows users to post details about games, including location, date, time, players, level, and ages. The App also offers "premium games," which are organized by the App and held at indoor courts that require a fee to reserve. The App is intended to be used solely for the purpose of connecting basketball players with each other.

                    Community Games
                    The App provides a platform for users to organize and register for "Community Games." These games are organized and run by users, and the App assumes no responsibility for any issues that may arise during these games. By participating in Community Games, users acknowledge and agree that they are solely responsible for their own safety and well-being. The App does not endorse or sponsor any Community Games and is not liable for any injury, loss, or damage that may occur as a result of participating in these games.

                    Premium Games
                    The App also offers "premium games," which are organized and run by the App. The App assumes responsibility for organizing and managing these games, including reserving indoor courts and collecting fees from users. By participating in premium games, users agree to pay any applicable fees and abide by any rules or guidelines set forth by the App. The App is not liable for any injury, loss, or damage that may occur as a result of participating in premium games.

                    User Conduct
                    Users of the App must comply with all applicable laws and regulations, as well as these Terms. Users may not use the App to engage in any illegal or prohibited activity, including but not limited to harassment, discrimination, or any activity that could harm the reputation or functioning of the App. The App reserves the right to remove any content or user that violates these Terms.

                    User Data
                    The App may collect and use user data, including but not limited to location, game details, and user information. The App may use this data to improve the App and its functionality, as well as to provide targeted advertising or other services. By using the App, users consent to the collection and use of their data as outlined in the App's privacy policy.

                    Intellectual Property
                    All content and materials on the App, including but not limited to logos, graphics, and text, are the property of the App or its licensors and are protected by intellectual property laws. Users may not use or reproduce any content or materials from the App without the express permission of the App.

                    Limitation of Liability
                    The App is provided "as is" and without any warranty or guarantee, express or implied. The App is not liable for any direct, indirect, incidental, special, or consequential damages that may result from the use or inability to use the App, including but not limited to damages for loss of profits, goodwill, or data. The App's liability is limited to the maximum extent permitted by law.

                    Modification and Termination
                    The App reserves the right to modify or terminate these Terms or the App at any time, with or without notice. Users are responsible for regularly reviewing these Terms for any changes. Continued use of the App constitutes acceptance of any modified Terms.

                    Governing Law
                    These Terms are governed by and construed in accordance with the laws of the state of [state], without giving effect to any principles of conflicts of law.

                    Dispute Resolution
                    Any dispute arising out of or relating to these Terms or the use of the App shall be resolved through arbitration in accordance with </Text>

            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    Header: {
        marginVertical: 15,
        flex: 1,
        fontSize: 22,
        textAlign: "center",
        fontWeight: "bold",
        color: "#fff",
    },
    aboutText: {
        textAlign: 'center',
        color: "#FFF",
        fontSize: 15,
        width: '90%'
    }
})

export default TermsAndCo;