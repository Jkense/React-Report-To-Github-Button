# Github Report Button

> This library allows users to implement a feedback button which will post issues on a Github repository.

![version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![license](https://img.shields.io/badge/license-MIT-blue.svg)

---

## How To Install

This package requires react.

1. Install through:
```bash
npm install github-report-button --save
```

2. Import `GithubReportButton` from `github-report-button`:

    ```javascript
    import GithubReportButton from 'github-report-button'
    ```
3. Create Personal access token:

    https://github.com/settings/tokens
    
    Allow public_repo as a scope
    
    ![Scope](https://github.com/Jkense/githubreportbutton/blob/master/PersonalAccessToken_Scope.JPG)
    
4. Use `GithubReportButton` component:

    ```javascript
    <ExampleComponent token="yourToken" owner="yourUsername" repo="yourPublicRepo"/>
    ```
    
    You can pass the following parameters:
    
| Parameter     | Default value               |
| ------------- | ----------------------------|
| token         | Required                    |
| owner         | Required                    |
| repo          | Required                    |
| buttonHeight  | (Optional) 7.5vh            |
| buttonText    | (Optional) 'report an issue'|
