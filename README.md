# testingON-action
Testing on testingON - GitHub Action

## Inputs

### `domain`

**Required** The domain of the machine where testingON is installed. Default: `"localhost"`

### `uri`
**Required** The URI of for the request.

### `username`
**Required** The testingON username.

### `password`
**Required** The testingON password.

### `wait-time`
**Required** The time between requests. Default: `"20"`

## Outputs

### `status`

The message with result of the test

## Example usage


**uses:** NTXnoesis/testingON-action@V1.1
**with:**
&ensp; **domain:** 'http://localhost:8080'
&ensp; **uri:** '/testingON/WebServices?LinkID=178&TypeID=1...'
&ensp; **username:** foo
&ensp; **passwrod:** xpto
&ensp; **wait-time:** 10

