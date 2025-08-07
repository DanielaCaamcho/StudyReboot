import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Login.module.css';

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { user, login, register, logout, loading: authLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (!displayName.trim()) {
          throw new Error('El nombre es requerido');
        }
        await register(email, password, displayName.trim());
      }
      
      // Limpiar formulario
      setEmail('');
      setPassword('');
      setDisplayName('');
    } catch (error: any) {
      let errorMessage = 'Ha ocurrido un error';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este email ya está registrado';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña debe tener al menos 6 caracteres';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email inválido';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Email o contraseña incorrectos';
          break;
        default:
          errorMessage = error.message || 'Ha ocurrido un error';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (authLoading) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loadingContainer}>
          <RefreshCw className="animate-spin" size={32} />
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            <User className={styles.titleIcon} size={28} />
            Mi Cuenta
          </h1>
        </div>

        <div className={styles.profileSection}>
          <div className={styles.profileCard}>
            <div className={styles.profileInfo}>
              <div className={styles.avatar}>
                {user.displayName?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
              </div>
              <div className={styles.userInfo}>
                <h3 className={styles.userName}>
                  {user.displayName || 'Usuario'}
                </h3>
                <p className={styles.userEmail}>{user.email}</p>
                <p className={styles.memberSince}>
                  Miembro desde {user.createdAt.toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className={styles.actions}>
              <button 
                onClick={handleLogout}
                className={`btn btn-outline ${styles.logoutButton}`}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>

          <div className={styles.syncSection}>
            <h3 className={styles.sectionTitle}>Estado de cuenta</h3>
            <p className={styles.syncDescription}>
              Tus datos se sincronizan automáticamente en la nube. 
              Puedes acceder desde cualquier dispositivo con tu cuenta.
            </p>
            <div className={styles.syncStatus}>
              <div className={styles.syncIndicator}></div>
              <span>Sincronizado</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <User className={styles.titleIcon} size={28} />
          {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h1>
        <p className={styles.subtitle}>
          {isLogin 
            ? 'Accede a tu progreso desde cualquier dispositivo' 
            : 'Crea una cuenta para sincronizar tu progreso'
          }
        </p>
      </div>

      <div className={styles.authForm}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          {!isLogin && (
            <div className={styles.formGroup}>
              <label htmlFor="displayName" className={styles.label}>
                <User size={18} />
                Nombre
              </label>
              <input
                id="displayName"
                type="text"
                placeholder="Tu nombre"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className={styles.input}
                required={!isLogin}
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              <Mail size={18} />
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              <Lock size={18} />
              Contraseña
            </label>
            <div className={styles.passwordWrapper}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                minLength={6}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.passwordToggle}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn btn-primary ${styles.submitButton}`}
          >
            {loading ? 'Cargando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
          </button>
        </form>

        <div className={styles.authToggle}>
          <p>
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setEmail('');
                setPassword('');
                setDisplayName('');
              }}
              className={styles.toggleButton}
            >
              {isLogin ? 'Crear cuenta' : 'Iniciar sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
