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
    const [isLogin,setIsLogin]= useState(false);
    const [menu,setMenu] = useState('Sidebar');
    const [formName,setFormName] = useState('');
    const [addNewFields, setAddNewField] = useState(false);
    const [fieldName, setFieldName] = useState("");
    const [fieldType, setFieldType] = useState("");
    const [fieldTypeData] = useState([
        'Text','Number','Textarea','Checkbox', 'Radio', 'Select', 'Password', 'File', 'Button','Hidden'
    ]);
    const [readonly, setReadonly] = useState(false);
    const [disabled,setDisabled] = useState(false);
    const [required,setRequired] = useState(false);
    const [maxLength,setMaxLength] = useState("");
    const [placeholder, setPlaceholder] = useState('');
    const [id, setId]  = useState("");

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
                                <Grid item xs={6}><h4 style={{ color: theme.palette.custom.light }}>Create Project</h4></Grid>                            
                                <Grid item xs={4} />
                                <Grid item xs={1}>
                                    <Button sx={{ bgcolor :'card.black', color:'custom.light'
                                    ,':hover': {bgcolor: 'card.black', color: 'custom.light'}, }} fullWidth size='small' variant="contained" onClick={() => { saveTemplate() }}>Save</Button>
                                </Grid>
                                <Grid item xs={1}>
                                    <Button sx={{ bgcolor:'card.red',color:'custom.light'
                                    ,':hover': {bgcolor: 'card.red', color: 'custom.light'}, }} fullWidth size='small' variant="contained" onClick={() => { clear() }}>Clear</Button>
                                </Grid>
                            </Grid>
                            <form autocomplete="off" onSubmit={(e) => {e.preventDefault();}} >
                                <Grid container>                                    
                                    <Grid item xs='6' sx={{ padding: '10px' }}>
                                        <Autocomplete  
                                            getOptionLabel={option => {
                                                return (option.templateName+ " - " +option.category+" - "+option.stack + " - " + option.version + " - " + option.framework);
                                            }}
                                            groupBy={(option) => option.templateName}
                                            value={templateName} onChange={(e,val) => setTemplateName(val) } options={templateData}
                                            renderInput={(params) => <TextField  color="custom"  {...params} focused label="Template" />}
                                        />
                                    </Grid>
                                    <Grid item xs='3' sx={{ padding: '10px' }}>
                                        <TextField color='custom' label="Name" focused fullWidth  disabled={!templateName}
                                            value={formName} onChange={(e) => { setFormName(e.target.value) }} placeholder='Form Name'
                                        />
                                    </Grid>
                                    <Grid item xs='1' sx={{ padding: '10px' }}>
                                        <Button sx={{ bgcolor :'card.black', color:'custom.light',height:'100%'
                                            ,':hover': {bgcolor: 'card.black', color: 'custom.light'},
                                        }} disabled={!formName} fullWidth size='small' variant="contained" 
                                        onClick={() => { setAddNewField(true) }}>Add Field</Button>
                                   </Grid>
                                    <Grid item xs='1' />
                                    <Grid item xs='5' sx={{ padding: '10px' }}>
                                        {/* <div style={{display:'flex',alignItems:'center'}}>
                                            <FormControlLabel control={<Checkbox color="custom" checked={isLogin} onChange={() => setIsLogin(e => !e)} />} label="Login" />
                                            <RadioGroup row>
                                                <FormControlLabel                                                    
                                                    control={<Radio 
                                                        checked={menu == "Sidebar"} color="custom"
                                                        onChange={() => setMenu("Sidebar")}
                                                     />}
                                                    label="Sidebar"
                                                    labelPlacement="bottom"
                                                />
                                                <FormControlLabel
                                                    control={<Radio 
                                                        checked={menu == "Navbar"} color="custom"
                                                        onChange={() => setMenu("Navbar")}
                                                     />}
                                                    label="Navbar"
                                                    labelPlacement="bottom"
                                                />
                                            </RadioGroup>
                                        </div>                                         */}
                                    </Grid>
                                </Grid>
                                <br/>
                                {(addNewFields && formName) && 
                                <Grid container>
                                    <Grid xs='3' item sx={{ padding: '10px' }}>
                                        <Autocomplete
                                            value={fieldType} onChange={(e,val) => setFieldType(val) } options={fieldTypeData}
                                            renderInput={(params) => <TextField  color="custom" {...params} 
                                            placeholder='Select any Type' focused label="Field Type" />}
                                        />
                                    </Grid>
                                    <Grid xs='3' item sx={{ padding: '10px' }}>
                                        <TextField color='custom' label="Field Name" focused  fullWidth
                                            value={fieldName} onChange={(e) => { setFieldName(e.target.value) }} placeholder='Field Name'
                                        />
                                    </Grid>
                                    <Grid xs='3' item sx={{ padding: '10px' }}>
                                        <TextField color='custom' label="Placeholder" focused fullWidth
                                            value={placeholder} onChange={(e) => { setPlaceholder(e.target.value) }} placeholder={`Enter the ${fieldName}`}
                                        />
                                    </Grid>
                                    <Grid xs='3' item sx={{ padding: '10px' }}>
                                        <TextField color='custom' label="Max Length" focused fullWidth
                                            value={maxLength} onChange={(e) => { setMaxLength(e.target.value) }} placeholder={`0 - 10`}
                                        />
                                    </Grid>
                                    <Grid xs='3' item sx={{ padding: '10px' }}>
                                        <TextField color='custom' label="ID" focused fullWidth
                                            value={id} onChange={(e) => { setId(e.target.value) }} 
                                        />
                                    </Grid>
                                    <Grid xs='1' item sx={{ padding: '10px' }}>
                                        <Checkbox color='custom'
                                            checked={readonly}
                                            onChange={(e) => setReadonly(e.target.checked)}
                                        />
                                        <span style={{color: theme.palette.custom.main  }}>Readonly</span>
                                    </Grid>
                                    <Grid xs='1' item sx={{ padding: '10px' }}>
                                        <Checkbox color='custom'
                                            checked={disabled}
                                            onChange={(e) => setDisabled(e.target.checked)}
                                        />
                                        <span style={{color: theme.palette.custom.main  }}>Disabled</span>
                                    </Grid>
                                    <Grid xs='1' item sx={{ padding: '10px' }}>
                                        <Checkbox color='custom'
                                            checked={required}
                                            onChange={(e) => setRequired(e.target.checked)}
                                        />
                                        <span style={{color: theme.palette.custom.main  }}>Required</span>
                                    </Grid>
                                    <Grid xs='12' item sx={{ padding: '10px' }}>
                                        <ProjectTable/>
                                    </Grid>
                                </Grid>
                                }
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