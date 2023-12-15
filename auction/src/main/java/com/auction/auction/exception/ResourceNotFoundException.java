package com.auction.auction.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException
{
    private static final Logger logger= LogManager.getLogger(ResourceNotFoundException.class);

    private static final long serialVersionUID = 1L;
    public ResourceNotFoundException(String message) {
        super(message);

        logger.warn("ResourceNotFoundException: "+message);
    }
}
