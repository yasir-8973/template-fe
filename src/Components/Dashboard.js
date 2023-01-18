import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Grid,Divider,Box,Card,CardActions,CardContent,Button } from '@mui/material';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import TableRowsIcon from '@mui/icons-material/TableRows';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import CloudSyncIcon from '@mui/icons-material/CloudSync';

export default function Dashboard() {
    return (
        <Box sx={{ width: '98%',margin:"2%" }}>
            <Grid container spacing ="2">
                <Grid item xs={3}>
                    <Card variant="outlined" sx={{bgcolor :'card.error', border: `1px solid `+'card.errorBorder',width:"85%"}}>
                        <CardContent style={{paddingBottom:0}}>
                            <Grid container>
                                <Grid item xs={6}>
                                     <div className="card-icon"><FolderCopyIcon/></div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className='card-category'>Templates</div>
                                    <div className="card-title">{120}</div>
                                </Grid>
                            </Grid>
                            <Divider sx={{bgcolor :'custom.light'}} />
                        </CardContent>
                        <CardActions>
                            <Button size="small" >
                                <Link to="create" className="card-link"><OpenInNewIcon />Create one</Link>
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card variant="outlined" sx={{bgcolor :'card.success', border: `1px solid `+'card.successBorder',width:"85%"}}>
                    <CardContent style={{paddingBottom:0}}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <div className="card-icon"><TableRowsIcon/></div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className='card-category'>Stacks</div>
                                    <div className="card-title">{10}</div>
                                </Grid>
                            </Grid>
                            <Divider sx={{bgcolor :'custom.light'}} />
                        </CardContent>
                        <CardActions>
                            <Button size="small">
                            <Link to="create" className="card-link"><OpenInNewIcon />View</Link>
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card variant="outlined" sx={{bgcolor :'card.red', border: `1px solid `+'card.redBorder',width:"85%"}}>
                        <CardContent style={{paddingBottom:0}}>
                            <Grid container>
                                <Grid item xs={6}>
                                     <div className="card-icon"><BackupTableIcon/></div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className='card-category'>Versions</div>
                                    <div className="card-title">{5}</div>
                                </Grid>
                            </Grid>
                            <Divider sx={{bgcolor :'custom.light'}} />
                        </CardContent>
                        <CardActions>
                            <Button size="small" >
                                <Link to="create" className="card-link"><OpenInNewIcon />View</Link>
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card variant="outlined" sx={{bgcolor :'card.black', border: `1px solid `+'card.blackBorder',width:"85%"}}>
                    <CardContent style={{paddingBottom:0}}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <div className="card-icon"><CloudSyncIcon/></div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className='card-category'>Framework</div>
                                    <div className="card-title">{10}</div>
                                </Grid>
                            </Grid>
                            <Divider sx={{bgcolor :'custom.light'}} />
                        </CardContent>
                        <CardActions>
                            <Button size="small">
                            <Link to="create" className="card-link"><OpenInNewIcon />View</Link>
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}