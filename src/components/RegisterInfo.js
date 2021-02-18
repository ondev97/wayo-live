import React from 'react'

function RegisterInfo() {
    return (
        <div className="regi_ins">
            <div className="regi_head">
                <h1>Registration Instructions</h1>
            </div>
            <div className="regi_body">
                <section>
                    <p>Please User Card Number As Class Number That Issued From Institute (EX: 123456)</p>
                </section>
                <section>
                    <p>Your password can’t be too similar to your other personal information.</p>   
                    <p>Your password must contain at least 8 characters.</p>    
                    <p>Your password can’t be a commonly used password.</p>
                    <p>Your password can’t be entirely numeric.</p>
                </section>
            </div>
        </div>
    )
}

export default RegisterInfo
