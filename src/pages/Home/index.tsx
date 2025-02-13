import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { useAppDispatch } from "../../store/hooks";
import { ILogin } from "../../types";
import { loginRequest } from "../../store/slices/userSlice";

export function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // dados do formulário
    const data: ILogin = {
      email: formData.email,
      password: formData.password,
    };

    // usar a função do async thunk
    const user = await dispatch(loginRequest(data)).unwrap();

    if (user) {
      navigate("/avaliacoes");
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <>
      <Container>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Fazer Login
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 12 }}>
              <TextField
                fullWidth
                name="email"
                variant="outlined"
                label="E-mail"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 12 }}>
              <TextField
                fullWidth
                name="password"
                variant="outlined"
                label="Senha"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid>
              <Button type="submit" variant="contained">
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}
