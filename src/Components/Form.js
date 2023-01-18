import React, { useEffect, useState } from 'react';
import { Autocomplete, Alert, TextField, Grid, Button, FormControlLabel, Checkbox, Card, CardContent, Radio, RadioGroup, Box, Modal } from '@mui/material';
import { theme } from '../common/muiStyles';
import API from '../common/Api';
import ProjectTable from './ProjectTable';

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

function Project(props) {
    const [templateName, setTemplateName] = useState(null);
    const [templateData, setTemplateData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({type:"info",message:""});
    const [formName,setFormName] = useState('');
    const [formLevel,setFormLevel] = useState('');
    const [addNewField,setAddNewField] = useState(false);

    useEffect(() => {
        return () => {
            getAllTemplates();
        }
    }, []);

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

    function saveTemplate(){

    }

    function clear(){

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
                                <Grid item xs={6}><h4 style={{ color: theme.palette.custom.light }}>Create Form</h4></Grid>                                                         
                                {/* <Grid item xs={4} /> */}
                                {/* <Grid item xs={1}>
                                    <Button sx={{ bgcolor :'card.black', color:'custom.light'
                                    ,':hover': {bgcolor: 'card.black', color: 'custom.light'}, }} fullWidth size='small' variant="contained" onClick={() => { saveTemplate() }}>Save</Button>
                                </Grid>
                                <Grid item xs={1}>
                                    <Button sx={{ bgcolor:'card.red',color:'custom.light'
                                    ,':hover': {bgcolor: 'card.red', color: 'custom.light'}, }} fullWidth size='small' variant="contained" onClick={() => { clear() }}>Clear</Button>
                                </Grid> */}
                            </Grid>
                            <form autocomplete="off" onSubmit={(e) => {e.preventDefault();}} >
                                <Grid container>
                                    <Grid item xs='6' sx={{ padding: '10px',marginRight: 'auto' }}>
                                        <Autocomplete  
                                            getOptionLabel={option => {
                                                return (option.templateName+ " - " +option.category+" - "+option.stack + " - " + option.version + " - " + option.framework);
                                            }}
                                            groupBy={(option) => option.templateName}
                                            value={templateName} onChange={(e,val) => setTemplateName(val) } options={templateData}
                                            renderInput={(params) => <TextField  color="custom"  {...params} focused label="Project" />}
                                        />
                                    </Grid>
                                    {templateName && (
                                        addNewField ? 
                                            <>
                                                <Grid item xs={1} sx={{ padding: '10px' }}>
                                                    <Button sx={{ color:'custom.light' }} fullWidth size='small' variant="contained" color="secondary" onClick={() => { saveTemplate() }}>Save</Button>
                                                </Grid>
                                                <Grid item xs={1} sx={{ padding: '10px' }}>
                                                    <Button sx={{ bgcolor:'card.red',color:'custom.light' }} fullWidth size='small' variant="contained" color="secondary" onClick={() => { setAddNewField(false) }}>Cancel</Button>
                                                </Grid>
                                            </>
                                        :
                                            <Grid item xs='1' sx={{ padding: '10px' }}>
                                                <Button sx={{ bgcolor :'card.red', color:'custom.light',height:'100%'
                                                    ,':hover': {bgcolor: 'card.red', color: 'custom.light'},
                                                }} fullWidth size='small' variant="contained" 
                                                onClick={() => { setAddNewField(true) }}>Add Form</Button>
                                            </Grid>
                                    )}
                                </Grid>
                                {addNewField && <Grid container>
                                    <Grid item xs='4' sx={{ padding: '10px' }}>
                                        <TextField color='custom' label="Form Name" focused fullWidth autocomplete="false"
                                            value={formName} onChange={(e) => { setFormName(e.target.value) }} placeholder='Eg. (Form-1)'
                                        />
                                    </Grid>
                                    <Grid item xs='4' sx={{ padding: '10px' }}>
                                    <Autocomplete                                              
                                            value={formLevel} onChange={(e,val) => setFormLevel(val) } 
                                            options={['Main Menu','Sub Menu']}
                                            renderInput={(params) => <TextField  color="custom"  {...params} focused label="Form Level" />}
                                        />
                                    </Grid>
                                </Grid>}
                            </form>
                            <br/>                 
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </>
    )
}
export default Project;