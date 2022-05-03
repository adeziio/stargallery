import React, { Component } from 'react';
import { Button, FormControl, Alert, Card, CardMedia } from '@mui/material';
import { uploadFile } from "./../api/BackendAPI";

export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: undefined,
            previewSrc: "",
            resMsg: ""
        }
    }

    setResMsg = (resMsg) => {
        this.setState({
            resMsg: resMsg
        })
    }

    handleFileSelect = (event) => {
        let file = event.target.files[0];

        if (file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = (e) => {
                this.setState({
                    file: file,
                    previewSrc: [reader.result],
                    resMsg: ""
                })
            }
        }
        else {
            this.setState({
                file: file,
                previewSrc: "",
                resMsg: ""
            })
        }
    }

    handleSubmit = async () => {
        const { file } = this.state;

        if (file) {
            const result = await uploadFile(file);
            if (result) {
                this.setResMsg(result.status);
            }
            else {
                this.setResMsg("Failed");
            }
        }
        else {
            this.setResMsg("No file selected");
        }
    }

    render() {
        const { resMsg, previewSrc } = this.state;

        return (
            <>
                <FormControl variant="standard" sx={{ width: "20rem", marginTop: "2rem" }}>
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ marginTop: 1 }}
                    >
                        <input
                            name="input"
                            type="file"
                            accept="image/jpeg, image/png"
                            onChange={this.handleFileSelect}
                        />
                    </Button>
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ marginTop: 1 }}
                        onClick={this.handleSubmit}
                    >
                        Submit
                    </Button>
                </FormControl>

                {resMsg === "Success" ? <Alert sx={{ marginTop: 1 }} severity="success">{resMsg}</Alert> : null}
                {resMsg === "No file selected" ? <Alert sx={{ marginTop: 1 }} severity="warning">{resMsg}</Alert> : null}
                {resMsg === "Failed" ? <Alert sx={{ marginTop: 1 }} severity="error">{`Failed to upload`}</Alert> : null}

                {previewSrc ?
                    <Card
                        sx={{ height: "100%", width: "100%", maxWidth: "20rem", display: "block", m: 2 }}
                        elevation={5}
                    >
                        <CardMedia
                            component="img"
                            width="100%"
                            image={previewSrc}
                            alt={"img"}
                        />
                    </Card> : null
                }
            </>
        )
    }
}