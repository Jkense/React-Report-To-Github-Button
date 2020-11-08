import React, { useState } from 'react'
import styles from './styles.module.css'
import githubLogo from '/GithubLogo/GitHub-Mark.svg'
import { Heading, Button, ButtonPrimary, Dialog, Box, Text, FormGroup, TextInput } from '@primer/components'
import { IssueOpenedIcon } from '@primer/octicons-react'

import { Octokit } from "@octokit/core";

export const GithubReportButton = ({ token, owner, repo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('title');
  const [description, setDescription] = useState('description');

  const handleClose = () => setIsOpen(false);
  const handleShow = () => setIsOpen(true);

  const titleChange = (e) => setTitle(e.target.value);
  const descriptionChange = (e) => setDescription(e.target.value);
  
  // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
  const octokit = new Octokit({ auth: token });

  const reportIssue = async (e) => {
    e.preventDefault();

    const issue = {
      title: title,
      body: description,
    }

    const url='POST /repos/'+owner+'/'+repo+'/issues';

    await octokit.request(url, issue)
      .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
      });
  }

return <React.StrictMode>
      <button className={styles.button} onClick={handleShow}>
        <img className={styles.logo} alt="Github Logo" src={githubLogo}></img>
        <Heading className={styles.text} fontSize={5}>Report an issue</Heading>
      </button>
        
      <Dialog isOpen={isOpen} onDismiss={handleClose}>
      <FormGroup onSubmit={reportIssue}>

        <Dialog.Header>
          <Heading fontSize={3}>
            <IssueOpenedIcon className={styles.issueIcon}/>
            Report an issue
          </Heading>
        </Dialog.Header>
        <Box p={3}>
            <FormGroup.Label htmlFor="title-text">Title of issue</FormGroup.Label>
            <TextInput id="title-text" aria-label="Title" width={600}
            onChange={titleChange} defaultValue="Please provide a title" />

            <FormGroup.Label className={styles.descriptionIssueLabel} htmlFor="description-text">Description of issue</FormGroup.Label>
            <TextInput className={styles.descriptionInput} id="description-text" aria-label="Description"
             width={600} onChange={descriptionChange} defaultValue="Please provide a description" />
        </Box>
        <Dialog.Header>
          <Button onClick={handleClose}>Close</Button>
          <ButtonPrimary className={styles.reportIssueButton} onClick={reportIssue} type="submit" value="Submit" >Report</ButtonPrimary>
        </Dialog.Header>
        </FormGroup>

      </Dialog>
    </React.StrictMode>
}