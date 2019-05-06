package org.dss.tennislog.security;

public class SecurityConstants {

    public static final String SIGN_UP_URLS = "/api/player/**";
    public static final String SECRET_KEY = "SecretKyeToGenerateJWTs";
    public static final String TOKEN_PREFIX = "Bearer "; //space is important
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 300_000; //~30 seconds

}
