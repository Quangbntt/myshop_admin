import React, { memo, useState, useEffect, useCallback } from "react";
import { Spin, Select } from "antd";
import moment from "moment";
import { Grid, Paper, Card, CardHeader, CardContent } from "@material-ui/core";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as style from "components/Variables";
import classNames from "classnames";
import { Ui } from "utils/Ui";
import ServiceBase from "utils/ServiceBase";
import _ from "lodash";
import { storage } from "firebase/index";

const index = memo(({ }) => {
    const [loading, setLoading] = useState(false);

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        setUrl(url);
                    });
            }
        );
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper>
                    <Spin spinning={loading} tip="Đang lấy dữ liệu...">
                        <Card>
                            <progress value={progress} max="100" />
                            <br />
                            <br />
                            <input type="file" onChange={handleChange} />
                            <button onClick={handleUpload}>Upload</button>
                            <br />
                            {url}
                            <br />
                            <img src={url || "http://via.placeholder.com/300"} alt="firebase-image" />
                        </Card>
                    </Spin>
                </Paper>
            </Grid>
        </Grid>
    );
});
export default index;
