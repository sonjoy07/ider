import React, { Fragment, useState } from 'react'
import { Button, Row, Col, Form, FormGroup, Label, Input, Table, TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText } from 'reactstrap';
import { CsvToHtmlTable } from 'react-csv-to-table';

import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames';

import Plot from 'react-plotly.js';

function Upload() {
    const [fileCsv, setFileCsv] = useState()
    const [csvValue, setCsvValue] = useState('')
    const [headers, setHeader] = useState([])
    const [rows, setRows] = useState([])
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    const onFileChange = e => {
        console.log('upload', e.target.files[0])
        setFileCsv(e.target.files[0])
    };
    const processCsv = (str, delim = ',') => {
        const header = str.slice(0, str.indexOf('\n')).split(delim)
        const rows = str.slice(str.indexOf('\n') + 1).split('\n');
        setHeader(header)
        setRows(rows)

    }
    const upload = (e) => {
        // console.log('text',typeof fileCsv)
        const csv = fileCsv
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result
            console.log(text)
            processCsv(text)
        }
        reader.readAsText(csv)
        console.log('csvValue', reader)
        // setCsvValue(fileCsv)
    }

    const exportCsv = () => {
        let mainHeader = []
        let mainrow = []
        headers.map(head => {
            let output = {
                label: head,
                key: head.toLowerCase()
            }
            mainHeader.push(output)
        })
        rows.map(row => {
            let output = {
                row
            }
            mainrow.push(output)
        })

        console.log('export', mainrow)
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
                                <Button color="info" onClick={upload}>Submit</Button>
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
            {/* <button className="btn btn-primary" onClick={exportCsv}>Export to csv</button> */}
            <Table bordered>
                <thead>
                    <tr>
                        {
                            headers.length > 0 && headers.map(res => {
                                return <th>{res}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        rows.length > 0 && rows.map(res => {
                            let row = res.split(',')
                            console.log('sonjoy', row)
                            return (<tr>
                                {row.length > 0 && row.map(data => {
                                    return <td>{data}</td>
                                })}
                            </tr>)
                        })
                    }
                </tbody>
            </Table>


            <div className="graph">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            Scatter
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Box
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '3' })}
                            onClick={() => { toggle('1'); }}
                        >
                            Histogram
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <Plot
                                    data={[
                                        {
                                            x: [1, 2, 3],
                                            y: [2, 6, 3],
                                            type: 'scatter',
                                            mode: 'lines+markers',
                                            marker: { color: 'red' },
                                        },
                                        { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
                                    ]}
                                    layout={{ width: 320, height: 240, title: 'A Scatter Plot' }}
                                />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <Plot
                                    data={[
                                        {
                                            x: [1, 2, 3],
                                            y: [2, 6, 3],
                                            type: 'box',
                                            mode: 'lines+markers',
                                            marker: { color: 'red' },
                                        },
                                        { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
                                    ]}
                                    layout={{ width: 320, height: 240, title: 'A Box Plot' }}
                                />
                            </Col>

                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <Col sm="12">
                                <Plot
                                    data={[
                                        {
                                            x: [1, 2, 3],
                                            y: [2, 6, 3],
                                            type: 'histogram',
                                            mode: 'lines+markers',
                                            marker: { color: 'red' },
                                        },
                                        { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
                                    ]}
                                    layout={{ width: 320, height: 240, title: 'A Histogram Plot' }}
                                />
                            </Col>

                        </Row>
                    </TabPane>
                </TabContent>

            </div>


        </Fragment>

    )
}

export default Upload
