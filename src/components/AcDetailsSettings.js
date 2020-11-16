import React from 'react'

export default function AcDetailsSettings({hadelChange,hadelSubmitForm,values,errors,hide,hideError}) {
    return (
        <div>
            <form onSubmit={hadelSubmitForm}>
                        <div className="sectpr">
                            <p>
                                <label htmlFor="fn">First Name</label>
                                <input type="text" id="fn" name="firstName" value={values.firstName} onChange={hadelChange} onFocus={hideError}/>
                                {
                                    errors.firstName && <span className={`tip ${hide.firstName ? 'hidetip' : ''}`}>{errors.firstName}</span>
                                }
                            </p>
                            <p>
                            <label htmlFor="ln">Last Name</label>
                                <input type="text" id="ln" name="lastName"  value={values.lastName}  onChange={hadelChange} onFocus={hideError}/>
                                {
                                    errors.lastName && <span className={`tip ${hide.lastName ? 'hidetip' : ''}`}>{errors.lastName}</span>
                                }
                            </p>
                        </div>
                        <div className="sectpr">
                            <p>
                                <label htmlFor="ln">User Name</label>
                                <input type="text" id="ln" name="userName" value={values.userName} onChange={hadelChange} onFocus={hideError}/>
                                {
                                    errors.userName && <span className={`tip ${hide.userName ? 'hidetip' : ''}`}>{errors.userName}</span>
                                }
                            </p>
                            <p>
                                <label htmlFor="pn">Phone Number</label>
                                <input type="text" id="pn" name="phoneNumber" value={values.phoneNumber} onChange={hadelChange} onFocus={hideError}/>
                                {
                                    errors.phoneNumber && <span className={`tip ${hide.phoneNumber ? 'hidetip' : ''}`}>{errors.phoneNumber}</span>
                                }
                            </p>
                        </div>
                        <div className="sectpr">
                            <p>
                                <label htmlFor="ad">Email</label>
                                <input type="text" id="ad" name="email" value={values.email} onChange={hadelChange} onFocus={hideError} />
                                {
                                    errors.email && <span className={`tip ${hide.email ? 'hidetip' : ''}`}>{errors.email}</span>
                                }
                            </p>
                        </div>
                        <div className="sectpr">
                            <p>
                                <label htmlFor="ad">Address</label>
                                <input type="text" id="ad" name="address" value={values.address} onChange={hadelChange} onFocus={hideError}/>
                                {
                                    errors.address && <span className={`tip ${hide.address ? 'hidetip' : ''}`}>{errors.address}</span>
                                }
                            </p>
                        </div>
                        <div className="sectpr">
                            <p>
                                <label htmlFor="ad">Descriptions</label>
                                <textarea cols="30" rows="10" name="des" value={values.des} onChange={hadelChange}onFocus={hideError}></textarea>
                                {
                                    errors.des && <span className={`tip ${hide.des ? 'hidetip' : ''}`}>{errors.des}</span>
                                }
                            </p>
                        </div>
                        <div className="skills_sec">
                            <div className="adSk">
                                <h3>Educations</h3>
                                <i className="far fa-plus-square"></i>
                            </div>
                            <div className="sk_sec">
                                <div className="nirow">
                                    <div className="nisec">
                                        <input type="text" placeholder="Skill Name"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="skills_sec">
                            <div className="adSk">
                                <h3>Experiences</h3>
                                <i className="far fa-plus-square"></i>
                            </div>
                            <div className="sk_sec">
                                <div className="nirow">
                                    <div className="nisec">
                                        <input type="text" placeholder="Skill Name"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="skills_sec">
                            <div className="adSk">
                                <h3>Skills</h3>
                                <i className="far fa-plus-square"></i>
                            </div>
                            <div className="sk_sec">
                                <div className="sk_row">
                                    <div className="in_sec">
                                        <input type="text" placeholder="Skill Name"/>
                                    </div>
                                    <div className="range_sec">
                                        <div className="subragesec">
                                            <input type="range" />
                                            <span>78%</span>
                                            <button type="button"><i className="fas fa-minus-circle"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="sk_row">
                                    <div className="in_sec">
                                        <input type="text" placeholder="Skill Name"/>
                                    </div>
                                    <div className="range_sec">
                                        <div className="subragesec">
                                            <input type="range" />
                                            <span>78%</span>
                                            <button type="button"><i className="fas fa-minus-circle"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="sk_row">
                                    <div className="in_sec">
                                        <input type="text" placeholder="Skill Name"/>
                                    </div>
                                    <div className="range_sec">
                                        <div className="subragesec">
                                            <input type="range" />
                                            <span>78%</span>
                                            <button type="button"><i className="fas fa-minus-circle"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pro_edit_sub">
                            <button>Save</button>
                        </div>
                    </form>
        </div>
    )
}
