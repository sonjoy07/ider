import React, { Fragment, useState } from 'react'
import { Button, Row, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { CsvToHtmlTable } from 'react-csv-to-table';

function Upload() {
    const [fileCsv, setFileCsv] = useState()
    const [csvValue, setCsvValue] = useState('')
    const onFileChange = e => {
        console.log('upload', e.target.files[0])
        setFileCsv(e.target.file)
    };
    const upload = (e) => {
        debugger
        const csv = fileCsv
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.targer.result
            console.log(text)
        }
        reader.readAsText(csv)
        // setCsvValue(fileCsv)
    }
    console.log('csvValue',Object.keys(csvValue).length === 0)
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

            {
                Object.keys(csvValue).length !== 0 && <CsvToHtmlTable
                    data={fileCsv}
                    csvDelimiter=","
                />
            }
        </Fragment>

    )
}

export default Upload
