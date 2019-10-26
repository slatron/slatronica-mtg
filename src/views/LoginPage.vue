<template>
  <div class="login-page">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '@/components/forms/LoginForm'

export default {
  name: 'LoginPage',
  components: {
    LoginForm
  }
}
</script>
