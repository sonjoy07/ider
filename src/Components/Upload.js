import React, { Fragment, useState } from 'react'
import { Button, Row, Col, Form, FormGroup, Label, Input, Table, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';


import { useSelector, useDispatch } from 'react-redux'

import Plot from 'react-plotly.js';
import {SetCsv,SetCsvRows} from './../actions/csv'
import { useHistory } from "react-router-dom";

function Upload() {
    const [fileCsv, setFileCsv] = useState()
    const [csvValue, setCsvValue] = useState('')
    const [headers, setHeader] = useState([])
    const [rows, setRows] = useState([])
    const dispatch = useDispatch()
    let history = useHistory();

    
    const onFileChange = e => {
        setFileCsv(e.target.files[0])
    };
    const processCsv = (str, delim = ',') => {
        const header = str.slice(0, str.indexOf('\n')).split(delim)
        const rows = str.slice(str.indexOf('\n') + 1).split('\n');
        setHeader(header)
        setRows(rows)

        dispatch(SetCsv(header))
        dispatch(SetCsvRows(rows))

    }
    const upload = (e) => {
        const csv = fileCsv
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result
            processCsv(text)
        }
        reader.readAsText(csv)
        setTimeout(() => {
            history.push("/table");
        },500)
        
        
        // setCsvValue(fileCsv)
    }

    
    return (
        <Fragment>
            <div className="csv_upload">
            <Form inline>
                <Row form>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="exampleEmail">CSV File Link:</Label>
                        </FormGroup>
                    </Col>
                    <Col md={9}>
                        <FormGroup>                            
                                <Input type="file" onChange={onFileChange} name="email" id="exampleEmail" placeholder="with a placeholder" />
                                <Button disabled={!fileCsv} color="info" onClick={upload}>Submit</Button>
                            </FormGroup>
                            
                    </Col>

                </Row>

                
            </Form>
            </div>
            {/* {
                Object.keys(csvValue).length !== 0 && <CsvToHtmlTable
                    data={fileCsv}
                    csvDelimiter=","
                />
            } */}
            
           


            


        </Fragment>

    )
}

export default Upload
