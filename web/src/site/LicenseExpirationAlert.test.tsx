import React from 'react'
import moment from 'moment'
import renderer from 'react-test-renderer'
import { LicenseExpirationAlert } from './LicenseExpirationAlert'

describe('LicenseExpirationAlert.test.tsx', () => {
    test('expiring soon', () => {
        expect(
            renderer.create(
                <LicenseExpirationAlert
                    expiresAt={moment()
                        .add(3, 'days')
                        .toDate()}
                    daysLeft={3}
                ></LicenseExpirationAlert>
            )
        ).toMatchSnapshot()
    })

    test('expired', () => {
        expect(
            renderer.create(
                <LicenseExpirationAlert
                    expiresAt={moment()
                        .subtract(3, 'months')
                        .toDate()}
                    daysLeft={0}
                ></LicenseExpirationAlert>
            )
        ).toMatchSnapshot()
    })
})
