import React, { useEffect, useState } from 'react';
import { Autocomplete, Alert, TextField, Grid, Button, IconButton, ButtonGroup, Card, CardContent, Divider, CardActions, Box, Modal } from '@mui/material';
import { theme } from '../common/muiStyles';
import API from '../common/Api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '10px'
};

function Add(props) {
    const [templateName, setTemplateName] = useState("");
    const [category, setCategory] = useState(null);
    const [stack, setStack] = useState(null);
    const [stackData, setStackData] = useState([]);
    const [version, setVersion] = useState(null);
    const [versionData, setVersionData] = useState([]);
    const [framework, setFramework] = useState(null);
    const [frameworkData, setFrameworkData] = useState([]);
    const [templateData, setTemplateData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({type:"info",message:""});
    const [templateID, setTemplateID] = useState("");


    useEffect(() => {
        return () => {
            getAllTemplates();
        }
    }, []);

    const onCategoryChange = (e) => {
        setCategory(e);
        setStack(null);
        setVersion(null);
        setFramework(null);
        setVersionData([]);
        setFrameworkData([]);
        if (e == "Frontend") {
            setStackData(["React", "Angular", "Vue", "HTML"]); 
        } else if (e == "Backend") {
            setStackData(["Java", "Node", "Python"]); 
        }
    }

    const onStackChange = (e) => {
        setStack(e);
        setVersion(null);
        setFramework(null);
        if (e == "React") {
            setVersionData(["16", "17", "18"]);
            setFrameworkData(["Material-UI", "Bootstrap", "Ant Design"]);
        } else if (e == "HTML") {
            setVersionData(["HTML5"]);
            setFrameworkData(["Bootstrap 4", "Bootstrap 5"]);
        } else if (e == "Node") {
            setVersionData(["14", "16"]);
            setFrameworkData(["Express"]);
        }
    }

    async function getAllTemplates() {
        let endPoint = 'templates/getTemplate';
        await API(endPoint,'post',{}).then(e => {            
            if(e.status == '200'){
                setTemplateData(e.data);
            }
        });
    }

    function ShowMessage(){
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }

    async function saveTemplate() {        
        if (!templateName) {
            setMessage({type:"warning",message:"Template is missing!"});
            ShowMessage();
            return false;
        }
        if (!category) {
            setMessage({type:"warning",message:"Category is missing!"});
            ShowMessage();
            return false;
        }
        if (!stack) {
            setMessage({type:"warning",message:"Stack is missing!"});
            ShowMessage();
            return false;
        }
        if (!version) {
            setMessage({type:"warning",message:"Version is missing!"});
            ShowMessage();
            return false;
        }
        if (!framework) {
            setMessage({type:"warning",message:"Framework is missing!"});
            ShowMessage();
            return false;
        }
        
            let endPoint = templateID  ? `templates/updateTemplate/${templateID}` : 'templates/saveTemplate'
            let body =  {
                templateName,
                category,
                stack,
                stackData,
                version,
                versionData,
                framework,
                frameworkData
            };
            console.log(body,'body');
            await API(endPoint,templateID  ? 'put' : 'post', body).then(e => {
                getAllTemplates();
                ShowMessage();
                setMessage({type:"success",message:"Template saved successfully"});
                clear();
            });
    }

    function clear() {
        setTemplateID(null);
        setTemplateName(null);
        setCategory(null);
        setStack(null);
        setVersion(null);
        setFramework(null);
        setStackData([]);
        setVersionData([]);
        setFrameworkData([]);
    }

    function onEdit(row) {
        setTemplateID(row._id);
        setTemplateName(row.templateName);
        setCategory(row.category);
        setStack(row.stack);
        setStackData(row.stackData);
        setVersion(row.version);
        setVersionData(row.versionData)
        setFramework(row.framework);
        setFrameworkData(row.frameworkData);
    }

    async function onDelete(row) {
        // await collection.deleteOne({ _id: row._id }).then(e => {
        //     setMessage("Deleted successfully");
        //     getAllTemplates();
        // });
    }

    return (
        <>
            <Modal
                open={loading}
                onClose={() => setLoading(false)}
            >
                <Box sx={style}>
                    <Alert severity={message.type}>{message.message}</Alert>
                </Box>
            </Modal>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card variant="outlined" sx={{bgcolor :'card.blue', border: `1px solid `+'card.blue',margin:'2%'}}>
                        <CardContent style={{paddingBottom:0}}>
                            <Grid container sx={{ alignItems:'center' }}>
                                <Grid item xs={6}><h4 style={{ color: theme.palette.custom.light }}>Create Template</h4></Grid>                            
                                <Grid item xs={4} />
                                <Grid item xs={1}>
                                    <Button sx={{ color:'custom.light' }} fullWidth size='small' variant="contained" color="secondary" onClick={() => { saveTemplate() }}>Save</Button>
                                </Grid>
                                <Grid item xs={1}>
                                    <Button sx={{ bgcolor:'card.red',color:'custom.light' }} fullWidth size='small' variant="contained" color="secondary" onClick={() => { clear() }}>Clear</Button>
                                </Grid>
                            </Grid>
                            <form autocomplete="off" onSubmit={(e) => {e.preventDefault();}} >
                                <Grid container>
                                    <Grid item xs sx={{ padding: '0 5px' }}>
                                        <TextField color='custom' label="Name" focused fullWidth autocomplete="false"
                                            value={templateName} onChange={(e) => { setTemplateName(e.target.value) }} placeholder='Eg. (Project-1)'
                                        />
                                    </Grid>
                                    <Grid item xs sx={{ padding: '0 5px' }}>
                                        <Autocomplete 
                                            getOptionSelected={(option, value) => (console.log(option,value,'value'))}
                                            value={category} onChange={(e,val) => onCategoryChange(val) } options={['Frontend','Backend']}
                                            renderInput={(params) => <TextField  color="custom"  {...params} focused label="Category" />}
                                        />
                                    </Grid>
                                    <Grid item xs sx={{ padding: '0 5px' }}>
                                        <Autocomplete
                                            value={stack} disabled={!category} onChange={(e,val) => onStackChange(val) } options={stackData}
                                            renderInput={(params) => <TextField  color="custom" {...params} focused label="Stack" />}
                                        />
                                    </Grid>
                                    <Grid item xs sx={{ padding: '0 5px' }}>
                                        <Autocomplete
                                            value={version} disabled={!stack} onChange={(e,val) => setVersion(val) } options={versionData}
                                            renderInput={(params) => <TextField  color="custom" {...params} focused label="Version" />}
                                        />
                                    </Grid>
                                    <Grid item xs sx={{ padding: '0 5px' }}>
                                        <Autocomplete
                                            value={framework} disabled={!stack} onChange={(e,val) => setFramework(val) } options={frameworkData}
                                            renderInput={(params) => <TextField  color="custom" {...params} focused label="Framework" />}
                                        />
                                    </Grid>
                                </Grid>
                            </form>
                            <br/>                 
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} >
                    <Grid container spacing={2} sx={{padding:'2%'}}>
                        {templateData.map((e, i) => (
                            <Grid item xs={3}>
                                <Card variant="outlined" sx={{bgcolor :'card.orange', border: `1px solid `+'card.orangeBorder',width:"100%"}}>
                                    <CardContent style={{paddingBottom:0}}>
                                        <div style={{ display:'grid'}}>
                                            <p style={{ color: theme.palette.custom.light,margin:'2px' }}><b>Template Name:</b> {e.templateName}</p>
                                            <p style={{ color: theme.palette.custom.light,margin:'2px' }}><b>Category:</b> {e.category}</p>
                                            <p style={{ color: theme.palette.custom.light,margin:'2px' }}><b>Stack:</b> {e.stack}</p>
                                            <p style={{ color: theme.palette.custom.light,margin:'2px' }}><b>Version:</b> {e.version}</p>
                                            <p style={{ color: theme.palette.custom.light,margin:'2px' }}><b>Framework:</b> {e.framework}</p>
                                        </div>
                                        <br/>
                                        <Divider sx={{bgcolor :'custom.light'}} />
                                    </CardContent>
                                    <CardActions>
                                        <IconButton sx={{color :'custom.light'}}  onClick={() => onEdit(e)}><EditIcon /></IconButton>
                                        <IconButton sx={{color :'custom.light'}} onClick={() => onDelete(e)}><DeleteIcon /></IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))} 
                    </Grid>
                </Grid>
            </Grid>

        </>
    )
}
export default Add;