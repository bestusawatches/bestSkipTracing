import React, { useEffect, useState, useRef } from "react";
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { Button, message, Upload, Table } from 'antd';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';


const { Dragger } = Upload;
const Tracing = () => {
    const [tableDisp, setTableDisp] = useState(false);
    const [exportEnable, setExportEnable] = useState(true);
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [tableData, setTableData] = useState({
        header: [],
        data: [],
    });

    const handleUpload = async () => {
        // const formData = new FormData();
        // // fileList.forEach((file) => {
        // //     formData.append('files[]', file);
        // // });
        // formData.append('data', JSON.stringify(tableData));
        setUploading(true);
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        setTableDisp(false);
        // You can use any AJAX library you like
        await fetch('http://192.168.43.207:8000/tracing/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(tableData),
        })
            .then((res) => res.text())
            .then((result) => { console.log(JSON.parse(result).data), handleData(JSON.parse(result).data), setTableDisp(true), setExportEnable(false) })
            .then(() => {
                setFileList([]);
                message.success('upload successfully.');
            })
            .catch(() => {
                message.error('upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });

    };

    const handleData = (result) => {
        const keys = Object.keys(result[0]);
        const header = keys.map((key, index) => ({
            title: key,
            dataIndex: index,
            key: index,
        }));

        const data = result.map(rowData => Object.values(rowData));


        console.log(keys);
        console.log(data)

        setTableData({ header, data });

        // setTableData({ header, data });

    }


    const handleFile = (file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            let readedData = XLSX.read(e.target.result, { type: 'binary' });

            const wsname = readedData.SheetNames[0];
            console.log(wsname)
            const ws = readedData.Sheets[wsname];
            console.log(ws)

            /* Convert array to json*/
            const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });

            const header = dataParse[0].map((data, index) => ({
                title: data,
                dataIndex: index,
                key: index,
            }));

            const data = dataParse.slice(1, dataParse.length).map(row => {
                const newRow = [];
                for (let i = 0; i < header.length; i++) {
                    newRow.push(row[i] || "");
                }
                return newRow;
            });

            console.log("data")
            console.log(data, header, "===")

            setTableData({ header, data });
        }

        reader.readAsArrayBuffer(file);
    };

    const props = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            handleFile(file);
            setTableDisp(true);
            return false;
        },
        fileList,
    };

    const handleExport = () => {
        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Create a new worksheet
        const worksheet = XLSX.utils.aoa_to_sheet([tableData.header.map(column => column.title), ...tableData.data]);

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Write the workbook to a file
        XLSX.writeFile(workbook, 'table_data.csv');
    }




    return (
        <>
            {/* <Upload {...props}>
                <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload> */}
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files.
                </p>
            </Dragger>

            {tableDisp && <Table dataSource={tableData.data} columns={tableData.header} />}

            <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{
                    marginTop: 16,
                }}
            >
                {uploading ? 'Uploading' : 'Start Upload'}
            </Button>

            <Button
                type="primary"
                onClick={handleExport}
                disabled={exportEnable}
                loading={exportEnable}
                style={{
                    marginTop: 16,
                    marginLeft: 0,
                }}
            >
                {'Export to Excel'}
            </Button>
        </>
    );
};
export default Tracing;