import React, { Fragment, useState } from 'react'
import { Button, Row, Col, Form, FormGroup, Label, Input, Table } from 'reactstrap';
import { CsvToHtmlTable } from 'react-csv-to-table';

import { useSelector, useDispatch } from 'react-redux'

function Upload() {
    const [fileCsv, setFileCsv] = useState()
    const [csvValue, setCsvValue] = useState('')
    const [headers, setHeader] = useState([])
    const [rows, setRows] = useState([])
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

        console.log('export',mainrow)
    }
    return (
        <Fragment>
            <Form inline>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleEmail">Upload</Label>
                            <Input type="file" onChange={onFileChange} name="email" id="exampleEmail" placeholder="with a placeholder" />
                        </FormGroup>
                    </Col>

                </Row>

                <Button color="info" onClick={upload}>Submit</Button>
            </Form>

            {/* {
                Object.keys(csvValue).length !== 0 && <CsvToHtmlTable
                    data={fileCsv}
                    csvDelimiter=","
                />
            } */}
            <button className="btn btn-primary" onClick={exportCsv}>Export to csv</button>
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
                            console.log('sonjoy',row)
                            return (<tr>
                                {row.length > 0 && row.map(data => {
                                   return <td>{data}</td>
                                })}
                            </tr>)
                        })
                    }
                </tbody>
            </Table>
        </Fragment>

    )
}

export default Upload
