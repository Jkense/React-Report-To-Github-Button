import React, { useState } from 'react'
import styles from './githubButton.module.css'
import githubLogo from '/GithubLogo/GitHub-Mark.svg'
import { Heading, Button, ButtonPrimary, Dialog, Box, Flash, FormGroup, TextInput } from '@primer/components'
import { IssueOpenedIcon } from '@primer/octicons-react'

import { Octokit } from "@octokit/core";

export const GithubReportButton = ({ token, owner, repo, buttonHeight='7.5vh', buttonText='Report an issue' }) => {
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

    if(title !== 'title' && description !== 'description' && title.length >= 3 && description.length >= 10 ){
      const issue = {
        title: title,
        body: description,
      }

      const url='POST /repos/'+owner+'/'+repo+'/issues';

      await octokit.request(url, issue)
        .then(data => {
          console.log(data); // JSON data parsed by `data.json()` call
        });
    } else{
      console.log('Please provide a title or description');
    }
  }

return <React.Fragment>
      <button style={{height:buttonHeight }} className={styles.button} onClick={handleShow}>
        <img className={styles.logo} alt="Github Logo" src={githubLogo}></img>
        <Heading className={styles.text} >{buttonText}</Heading>
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
            onChange={titleChange} defaultValue="Please provide a title"/>

            {title === 'title' || title.length < 3 && <Flash variant="danger">
              <IssueOpenedIcon className={styles.issueIcon}/>
              Please provide a title
            </Flash>}

            <FormGroup.Label className={styles.descriptionIssueLabel} htmlFor="description-text">Description of issue</FormGroup.Label>
            <TextInput className={styles.descriptionInput} id="description-text" aria-label="Description"
             width={600} onChange={descriptionChange} defaultValue="Please provide a description" />

            {description === 'description' || description.length < 10 && <Flash variant="danger">
              <IssueOpenedIcon className={styles.issueIcon}/>
              Please provide a description
            </Flash>}
            
        </Box>
        <Dialog.Header>
          <Button onClick={handleClose}>Close</Button>
          <ButtonPrimary className={styles.reportIssueButton} onClick={reportIssue} type="submit" value="Submit" >Report</ButtonPrimary>
        </Dialog.Header>
        </FormGroup>

      </Dialog>
    </React.Fragment>
}