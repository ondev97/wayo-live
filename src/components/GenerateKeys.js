import React from 'react'
import '../assets/css/formgenkey.css';

function GenerateKeys() {
    return (
        <div className="genkeysform">
            <div className="main_gen_form">
                <form>
                    <p>
                        <label htmlFor="ks">How Many Keys?</label>
                        <input type="number" min="0" step="1" name="hw" id="ks"/>  
                    </p>

                    <div className="gen_sub">
                        <button>Generate</button>
                    </div>
                </form>
                <div className="disp_gen_keys">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Key</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>01</td>
                                <td>0asdasdafd6156sa6516161a1</td>
                                <td>
                                    <input type="checkbox" name="actigen" />
                                </td>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>0asdasdafd6156sa6516161a1</td>
                                <td>
                                    <input type="checkbox" name="actigen" />
                                </td>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>0asdasdafd6156sa6516161a1</td>
                                <td>
                                    <input type="checkbox" name="actigen" />
                                </td>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>0asdasdafd6156sa6516161a1</td>
                                <td>
                                    <input type="checkbox" name="actigen" />
                                </td>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>0asdasdafd6156sa6516161a1</td>
                                <td>
                                    <input type="checkbox" name="actigen" />
                                </td>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>0asdasdafd6156sa6516161a1</td>
                                <td>
                                    <input type="checkbox" name="actigen" />
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default GenerateKeys
